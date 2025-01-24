import Reactotron from "reactotron-react-native";
import mmkvPlugin from "reactotron-react-native-mmkv";
import type { ReactotronReactNative } from "reactotron-react-native";
import { openInEditor } from "reactotron-react-native";
import { storage, removeItem } from "./utils/storage";
import { AUTH_STORE } from "./constants/Service";
import apisaucePlugin from "reactotron-apisauce";

Reactotron.configure({ name: "nativer" })
  .use(mmkvPlugin<ReactotronReactNative>({ storage }))
  .use(openInEditor())
  .use(apisaucePlugin())
  .useReactNative()
  .connect()
  .onCustomCommand({
    command: "auth cache clean",
    handler: () => {
      removeItem(AUTH_STORE);
      Reactotron.display({
        name: "MMKV Data",
        value: { key: "done" },
        important: true,
      });
    },
    title: "Cache Clean MMKV auth Data",
    description: "Clean data from MMKV auth storage",
  });
