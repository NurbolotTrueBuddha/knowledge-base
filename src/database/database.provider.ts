import { ARTICLE_MODEL, USER_MODEL } from "src/constants";
import { Articles, Users } from "./models/knowledge";

  
  export const databaseProviders = [
    {
      provide: USER_MODEL,
      useFactory: () => Users,
    },
    {
      provide: ARTICLE_MODEL,
      useFactory: () => Articles,
    },
  ];
  