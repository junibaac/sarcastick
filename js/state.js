// CONFIG & STATE
const VALID_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "bmp"];
const MASTER_HASH = "a6c30408546530fa990e15cac376a86b";

let MEME_DATABASE = [];
let USER_LIST = {}; // Nickname -> User data
let USER_NICKNAME = localStorage.getItem("meme_user_nickname") || null;
let GITHUB_TOKEN = localStorage.getItem("gh_token") || null;
const REPO_OWNER = "junibaac";
const REPO_NAME = "sarcastick";
let OCTOKIT = null;
let CURRENT_MEME = null;

// DOM ELEMENTS (References to be assigned after load)
let bootScreen, bootProgress, loginScreen, desktop;
let nicknameInput, passwordInput, loginBtn, loginCancelBtn, loginHelpBtn;
let userDisplay, connectionStatus, startupSound;
let galleryContainer, profileContainer, hofContainer;
let fileUploader, uploadSubmitBtn;
let imageModal, modalImg, modalTitle, modalAuthor, modalDate, modalVotes;
let commentList, commentInput;
