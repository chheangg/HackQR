import { MemberDocument } from "src/member/member.document";

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [
  MemberDocument.collectionName,
];