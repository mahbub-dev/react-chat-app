/* eslint-disable react-hooks/exhaustive-deps */
import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import ApiRequest from "./Api Request/apiRequest";
import {handleModals} from "./Utils/functions";

const AppContext = createContext();
const AppProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState("");
    const [conversation, setConversation] = useState([]);
    const [userList, setUserList] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [unreadMessage, setUnreadMessage] = useState([]);
    const [userComps, setUserComps] = useState("");
    const [newMessagCount, setNewMessageCount] = useState(0);
    const soundRef = useRef("yes");
    useEffect(() => {
        soundRef.current = localStorage.getItem("sound");
    }, []);
    // handle Modals
    const [user, setUser] = useState("");
    const [showImage, setShowImage] = useState();
    const [email, setEmail] = useState("");
    useEffect(() => {
        let newSmsCount = [];
        unreadMessage ?. forEach((i) => {
            newSmsCount.push(i.sender);
        });
        const newMessage = newSmsCount ?. filter((item, index, arr) => arr.indexOf(item) === index);
        setNewMessageCount(newMessage.length);
    }, [unreadMessage]);

    const OpenUserDetails = (data) => {
        setUser(data);
        handleModals(true, "user-details");
    };
    const OpenUploadImage = (data) => {
        setShowImage(data);
        handleModals(true, "imageShow");
    };

    const OpenEmailUpdateForm = (data) => {
        setEmail(data);
        handleModals(true, "change-email");
    };

    // send mail for verifiaction

    useEffect(() => {
        const getLoginUser = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                const res = await ApiRequest.get(`/user/${userId}`);
                if (res.status === 200) {
                    setLoggedUser(res.data);
                    localStorage.setItem('profilePicture', res.data.profilePicture)
                }
            }
        };
        getLoginUser();
    }, []);

    const memoValue = {
        user,

        OpenUserDetails,
        OpenUploadImage,
        OpenEmailUpdateForm,
        email,
        showImage,

        // for login user
        loggedUser,
        setLoggedUser,

        conversation,
        setConversation,

        userList,
        setUserList,
        searchValue,
        setSearchValue,

        unreadMessage,
        setUnreadMessage,
        userComps,
        setUserComps,
        newMessagCount,
        setNewMessageCount,
        soundRef
    };
    return (<AppContext.Provider value={memoValue}> {children}</AppContext.Provider>);
};
export default AppProvider;
export const useGlobalContext = () => useContext(AppContext);
