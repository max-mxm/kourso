// Fichier centralisé pour exporter tous les articles
// Pour ajouter un nouvel article, créez un dossier avec metadata.ts et content.tsx,
// puis exportez-les ici

export { metadata as tddMetadata } from './tdd-frontend-vs-backend/metadata';
export { default as TDDContent } from './tdd-frontend-vs-backend/content';

export { metadata as reduxVsContextVsZustandMetadata } from './redux-vs-context-vs-zustand/metadata';
export { default as ReduxVsContextVsZustandContent } from './redux-vs-context-vs-zustand/content';

export { metadata as react19ActionsProductionMetadata } from './react-19-actions-production/metadata';
export { default as React19ActionsProductionContent } from './react-19-actions-production/content';

export { metadata as react192ActivityUseEffectEventMetadata } from './react-19-2-activity-useeffectevent/metadata';
export { default as React192ActivityUseEffectEventContent } from './react-19-2-activity-useeffectevent/content';
