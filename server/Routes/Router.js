const router = require('express').Router();
const { sendOtp, verifyOtp, activateUser, refresh, logout, getUser, getUserByData } = require('../Controllers/AuthController')
const { chatApp, getIds, sendChats, getChats, getConversation, checkCs } = require('../Controllers/Conversation-Controller');
const { createCat, createRole, createChannel, getRoom, getChannels, generateInviteCode, verifyInvitecode, getUserRoles, leaveServer, checkInviteCode, deleteRole, updateRole, updateCat, updateChannel, deleteCat, deleteChannel, expireCode, getAllInviteCode, getUserByRole, updateUserRole } = require('../Controllers/Grp-controller');
const { create, getRooms, getRoomId, updateRoom, updateName, deleteRoom, sendCodeEmail } = require('../Controllers/Rooms-Controller');
const authMiddlewares = require('../middlewares/authMiddlewares')

// user authentication
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/activate-user', authMiddlewares, activateUser);
router.get('/refresh', refresh);
router.post('/logout', authMiddlewares, logout)

//send an email code invite to a server
router.post('/send-email', authMiddlewares, sendCodeEmail);

// rooms
router.post('/rooms', authMiddlewares, create);
router.post('/updateRoom', authMiddlewares, updateRoom)
router.post('/check', authMiddlewares, checkCs)
router.post('/chat', authMiddlewares, chatApp);
router.get('/chat/:userId', authMiddlewares, getIds);
router.get('/conv/:convId', authMiddlewares, getConversation);
router.get('/user/:userId', authMiddlewares, getUser);
router.post('/chats', authMiddlewares, sendChats);
router.get('/chats/:conversationId', authMiddlewares, getChats);
router.get('/userData', authMiddlewares, getUserByData)
router.get('/rooms/:userId', authMiddlewares, getRooms)
router.get('/room/:roomId', authMiddlewares, getRoomId)

router.post('/grp/cat', authMiddlewares, createCat);
router.post('/grp/role', authMiddlewares, createRole)
router.post('/grp/channels', authMiddlewares, createChannel)

router.get('/grp/:roomId', authMiddlewares, getRoom)
router.get('/grp/channels/:roomId', authMiddlewares, getChannels)

router.post('/grp/codes', authMiddlewares, generateInviteCode)
router.post('/grp/invites', authMiddlewares, verifyInvitecode);
router.post('/grp/roles', authMiddlewares, getUserRoles);

router.post('/grp/leave', authMiddlewares, leaveServer);
router.post('/grp/delete-role', authMiddlewares, deleteRole);
router.post('/grp/update-user-role', authMiddlewares, updateUserRole)
router.post('/grp/delete-server', authMiddlewares, deleteRoom);
router.post('/grp/add-role', authMiddlewares, updateRole);
router.post('/grp/user-by-role', authMiddlewares, getUserByRole);
router.post('/grp/invites/check', authMiddlewares, checkInviteCode)
router.post('/grp/invites/expire', authMiddlewares, expireCode)
router.post('/grp/get-code', authMiddlewares, getAllInviteCode);

router.post('/grp/update-cat', authMiddlewares, updateCat);
router.post('/grp/update-channel', authMiddlewares, updateChannel);
router.post('/grp/delete-cat', authMiddlewares, deleteCat);
router.post('/grp/delete-channel', authMiddlewares, deleteChannel);
router.post('/grp/update-name', authMiddlewares, updateName);

module.exports = router;