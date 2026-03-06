import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: 'C:/Users/ACER/testovaciverze/tina/__generated__/.cache/1772837811632', url: 'http://localhost:4001/graphql', token: '104a121fc862eee12c2e865facc0f4dd0fbb6795', queries,  });
export default client;
  