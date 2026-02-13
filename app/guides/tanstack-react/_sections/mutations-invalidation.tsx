import { ConceptCard } from '@/components/course/concept-card';
import { CodeBlock } from '@/components/course/code-block';

export default function MutationsInvalidationSection() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Les mutations sont l&apos;autre face de TanStack Query : si useQuery
        gere la lecture des donnees, useMutation gere l&apos;ecriture. Creer,
        modifier, supprimer -- chaque operation qui change l&apos;etat du
        serveur passe par une mutation. Le defi est ensuite de synchroniser le
        cache local avec les nouvelles donnees du serveur, soit par
        invalidation, soit par mise a jour directe.
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          useMutation : le hook d&apos;ecriture
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          useMutation fournit une fonction mutate (ou mutateAsync) et un
          ensemble d&apos;etats (isPending, isSuccess, isError) pour gerer
          le cycle de vie complet d&apos;une operation d&apos;ecriture. Les
          callbacks onSuccess, onError et onSettled permettent d&apos;executer
          de la logique a chaque etape.
        </p>
      </div>

      <CodeBlock
        code={`import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface CreateUserPayload {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

async function createUser(payload: CreateUserPayload): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la creation');
  }

  return response.json();
}

export function CreateUserForm() {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,

    // Appele quand la mutation reussit
    onSuccess: (newUser) => {
      // Invalider la liste des utilisateurs pour forcer un refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });

      // Notification de succes
      toast.success(\`Utilisateur \${newUser.name} cree avec succes\`);

      // Optionnel : pre-remplir le cache du detail utilisateur
      queryClient.setQueryData(['users', newUser.id], newUser);
    },

    // Appele quand la mutation echoue
    onError: (error) => {
      toast.error(\`Echec : \${error.message}\`);
    },

    // Appele dans tous les cas (succes ou echec)
    onSettled: () => {
      // Nettoyage, reset de formulaire, etc.
      console.log('Mutation terminee');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    createUserMutation.mutate({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as CreateUserPayload['role'],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Nom" required />
      <input name="email" type="email" placeholder="Email" required />
      <select name="role">
        <option value="user">Utilisateur</option>
        <option value="editor">Editeur</option>
        <option value="admin">Administrateur</option>
      </select>

      <button
        type="submit"
        disabled={createUserMutation.isPending}
        className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
      >
        {createUserMutation.isPending ? 'Creation en cours...' : 'Creer'}
      </button>

      {createUserMutation.isError && (
        <p className="text-red-500 text-sm">
          {createUserMutation.error.message}
        </p>
      )}
    </form>
  );
}`}
        language="tsx"
        filename="create-user-form.tsx"
        highlightLines={[36, 37, 41, 42, 47, 51, 56, 68]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Invalidation : exact vs fuzzy matching
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Apres une mutation, il faut synchroniser le cache. La methode la plus
          simple est l&apos;invalidation : elle marque les queries comme stale
          et declenche un refetch automatique pour les queries actuellement
          observees. L&apos;invalidation supporte deux modes : fuzzy (par
          defaut) qui invalide toutes les queries commencant par le prefixe, et
          exact qui ne cible qu&apos;une query key precise.
        </p>
      </div>

      <CodeBlock
        code={`import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// ---- FUZZY MATCHING (defaut) ----
// Invalide TOUTES les queries dont la key commence par ['users']
// Correspond a : ['users'], ['users', 1], ['users', { page: 1 }], etc.
await queryClient.invalidateQueries({
  queryKey: ['users'],
});

// Invalide toutes les queries du user 42
// Correspond a : ['users', 42], ['users', 42, 'posts'], etc.
await queryClient.invalidateQueries({
  queryKey: ['users', 42],
});

// ---- EXACT MATCHING ----
// Invalide UNIQUEMENT la query ['users'] et rien d'autre
await queryClient.invalidateQueries({
  queryKey: ['users'],
  exact: true,
});

// ---- FILTRAGE PAR PREDICAT ----
// Invalider seulement les queries qui correspondent a une condition
await queryClient.invalidateQueries({
  predicate: (query) => {
    // Invalider toutes les queries stale qui commencent par 'users'
    return (
      query.queryKey[0] === 'users' &&
      query.state.isInvalidated === false
    );
  },
});

// ---- INVALIDATION AVEC TYPE ----
// Invalider seulement les queries actives (observees par un composant)
await queryClient.invalidateQueries({
  queryKey: ['users'],
  type: 'active', // 'active' | 'inactive' | 'all'
});

// ---- DANS UN CALLBACK onSuccess ----
const deleteUserMutation = useMutation({
  mutationFn: (userId: number) => deleteUser(userId),
  onSuccess: (_, deletedUserId) => {
    // Invalider la liste
    queryClient.invalidateQueries({ queryKey: ['users'] });
    // Supprimer du cache la query detail de l'utilisateur supprime
    queryClient.removeQueries({ queryKey: ['users', deletedUserId] });
  },
});`}
        language="tsx"
        filename="invalidation-patterns.tsx"
        highlightLines={[8, 9, 20, 21, 22, 28, 29, 39, 40, 49, 51]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Mise a jour directe du cache avec setQueryData
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Pour une experience utilisateur encore plus reactive, vous pouvez
          mettre a jour le cache directement sans attendre la reponse du
          serveur. setQueryData ecrit des donnees dans le cache comme si
          elles provenaient d&apos;un fetch. Cela est ideal quand le serveur
          retourne l&apos;entite mise a jour dans sa reponse.
        </p>
      </div>

      <CodeBlock
        code={`import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: string;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: UpdateUserPayload }) =>
      updateUserOnServer(userId, data),

    onSuccess: (updatedUser) => {
      // Mise a jour directe du cache du detail utilisateur
      // Pas de refetch necessaire : le serveur a retourne l'entite mise a jour
      queryClient.setQueryData(['users', updatedUser.id], updatedUser);

      // Mise a jour de la liste des utilisateurs en cache
      queryClient.setQueryData<User[]>(['users'], (oldUsers) => {
        if (!oldUsers) return [updatedUser];
        return oldUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });
    },
  });
}

// Utilisation dans un composant
export function UserEditForm({ user }: { user: User }) {
  const updateUser = useUpdateUser();

  const handleSave = (data: UpdateUserPayload) => {
    updateUser.mutate(
      { userId: user.id, data },
      {
        // Callbacks specifiques a cet appel
        onSuccess: () => {
          toast.success('Modifications enregistrees');
        },
      }
    );
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSave(formData); }}>
      {/* ... champs du formulaire ... */}
      <button disabled={updateUser.isPending}>
        {updateUser.isPending ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  );
}`}
        language="tsx"
        filename="direct-cache-update.tsx"
        highlightLines={[19, 22, 23, 24, 25, 26]}
        category="rendering"
      />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Mises a jour optimistes
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Les mises a jour optimistes offrent la meilleure experience
          utilisateur : l&apos;interface est mise a jour instantanement avant
          meme que le serveur ait repondu. Si la mutation echoue, un rollback
          automatique restaure l&apos;etat precedent. Ce pattern requiert 4
          etapes : annuler les queries en cours, sauvegarder un snapshot,
          appliquer la mise a jour optimiste, et prevoir le rollback.
        </p>
      </div>

      <CodeBlock
        code={`import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) =>
      fetch(\`/api/todos/\${todoId}/toggle\`, { method: 'PATCH' }).then((r) => r.json()),

    // ETAPE 1 : Avant que la mutation ne parte
    onMutate: async (todoId: number) => {
      // 1a. Annuler les queries en cours pour eviter les conflits
      // entre le refetch et notre mise a jour optimiste
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // 1b. Sauvegarder un snapshot de l'etat actuel pour le rollback
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // 1c. Appliquer la mise a jour optimiste dans le cache
      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old?.map((todo) =>
          todo.id === todoId
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      );

      // 1d. Retourner le snapshot pour le rollback
      return { previousTodos };
    },

    // ETAPE 2 : En cas d'erreur, rollback
    onError: (_error, _todoId, context) => {
      // Restaurer le snapshot sauvegarde dans onMutate
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      toast.error('Erreur lors de la mise a jour. Modification annulee.');
    },

    // ETAPE 3 : Dans tous les cas, resynchroniser avec le serveur
    onSettled: () => {
      // Invalider pour s'assurer que le cache est en phase avec le serveur
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

// Utilisation : l'interface reagit instantanement
export function TodoItem({ todo }: { todo: Todo }) {
  const toggleTodo = useToggleTodo();

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border">
      <button
        onClick={() => toggleTodo.mutate(todo.id)}
        className={todo.completed ? 'line-through text-muted-foreground' : ''}
      >
        <span className={todo.completed ? 'bg-primary' : 'bg-muted'}>
          {todo.completed ? 'V' : ' '}
        </span>
      </button>
      <span>{todo.title}</span>
    </div>
  );
}`}
        language="tsx"
        filename="optimistic-update.tsx"
        highlightLines={[17, 20, 21, 23, 26, 27, 34, 39, 40, 41, 42, 48, 49]}
        category="rendering"
      />

      <ConceptCard
        title="Invalidation vs mise a jour directe : quand choisir quoi"
        description="Le choix entre invalidation et mise a jour directe du cache depend de plusieurs facteurs. Voici un guide pour prendre la bonne decision."
        category="rendering"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/50 border border-blue-500/30">
            <h4 className="font-bold text-foreground mb-2">
              Privilegier l&apos;invalidation quand :
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>La mutation affecte des donnees que vous n&apos;avez pas en local (tri cote serveur, aggregations)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Plusieurs queries dependantes doivent etre rafraichies</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>La structure du cache est complexe et la mise a jour manuelle serait fragile</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Le cout reseau d&apos;un refetch est acceptable</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-background/50 border border-primary/30">
            <h4 className="font-bold text-foreground mb-2">
              Privilegier la mise a jour directe quand :
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Le serveur retourne l&apos;entite complete mise a jour dans la reponse</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Vous voulez une reactivite instantanee sans requete supplementaire</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>La transformation du cache est simple et previsible (remplacement d&apos;un element)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Vous implementez des mises a jour optimistes avec rollback</span>
              </li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-sm text-muted-foreground">
              <strong>Conseil pratique :</strong> commencez toujours par
              l&apos;invalidation. Elle est plus simple, plus sure et
              couvre 80% des cas. Migrez vers la mise a jour directe
              uniquement quand la performance ou l&apos;experience
              utilisateur le justifient.
            </p>
          </div>
        </div>
      </ConceptCard>
    </div>
  );
}
