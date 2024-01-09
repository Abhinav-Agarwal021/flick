# Flick - A meetup application web service.

Flick is a full-stack project that allows users to create virtual rooms and participate in group video calls and chat with other members of the room. Additionally, it also supports direct messaging between users for private conversations. It is built using a combination of React, Node.js, and Socket.io.

## Features

- Create a virtual room with a unique URL
- Join a virtual room using the invite code
- Video call with other members of the room
- Group chat with other members of the room
- Direct message other members of the room
- Mute/unmute audio and video during a video call
- Leave the virtual room

## Technologies Used

- React.js
- Node.js
- Socket.io

## Setup

To run Virtual Meet on your local machine, follow these steps:

1. Clone the repository to your local machine.

   ```
   git clone https://github.com/Abhinav-Agarwal021/flick
   ```

2. Install the required packages.

   ```
   cd flick
   npm run build
   ```

4. Change the target API link to the port that you are going to select for the server.

5. Setting up environment variables for the server

6. Start the application.
   
   ```
   npm start
   ```

8. Open the application in your web browser.

   ```
   http://localhost:{port}
   ```

## Usage

##  Login/Register

1. Enter the Email ID you would want to log in with
2. you will receive an OTP on your email ID enter it and continue.
3. if you already have an account then the user will land on the rooms else he will need to enter some basic pieces of information about him.

### Creating a Virtual Room

1. Open the Virtual Meet application.
2. Click on the "Create a Room" button.
3. Enter a unique name for your virtual room and click on the "Create Room" button.
4. Share the Invite code with the other members you want to invite to the room.

### Joining a Virtual Room

1. Open the Virtual Meet application.
2. Enter the unique Invite Code for the virtual room you want to join and click on the "Join Room" button.
3. Grant the application permission to access your microphone and camera.
4. Wait for the other members of the room to join.

### Group Video Call

1. Once all the members of the room have joined, click on the "Start Video Call" button.
2. Grant the application permission to access your microphone and camera if you haven't already.
3. Use the mute/unmute buttons to control your audio and video during the call.
4. Click on the "Leave Call" button to end the call.

### Group Chat

1. During the video call or in the virtual room, click on the "Open Group Chat" button to open the group chat.
2. Type your message in the chat box and press the "Enter" key to send it.
3. Receive messages from other members of the room in real-time.

### Direct Messaging

1. In the virtual room or group chat, click on the "Direct Messages" button.
2. Select the user you want to start a conversation with.
3. Type your message in the chat box and press the "Enter" key to send it.
4. Receive messages from the user in real-time.

### Sending and Receiving Files

1. In the group chat or direct messaging, click on the "File Attach" button.
2. Select the file you want to send and click on the "Send" button.
3. Receive files from other users in real-time.
