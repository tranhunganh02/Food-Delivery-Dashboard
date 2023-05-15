import {
     createContext,
     useContext,
     useReducer,
   } from "react";
   import { AuthContext } from "./AuthContext";
   
   export const ChatContext = createContext();
   
   export const ChatContextProvider = ({ children }) => {
     const { currentUser } = useContext(AuthContext);
     const INITIAL_STATE = {
       chatId: "null",
       user: {},
     };
   
     const chatReducer = (state, action) => {
       switch (action.type) {
         case "CHANGE_USER":
           return {
             user: action.payload,
             chatId:
                action.payload.id
           };
   
         default:
           return state;
       }
     };
   
     const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
   
     return (
       <ChatContext.Provider value={{ dataUser:state, dispatch }}>
         {children}
       </ChatContext.Provider>
     );
   };