/**
 * Created by thuynghi on 19/07/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.chat')
    .controller('ChatController', chatController);

  chatController.$inject = ['$scope', '$rootScope', 'yourName', '$window', 'appConstant', '$state',
    'chatService'];
  /* @ngInject */
  function chatController($scope, $rootScope, yourName, $window, appConstant, $state,
                          chatService) {

    var vm = this;
    var meSend="";
    meSend += "        <li class=\"clearfix\">";
    meSend += "          <div class=\"message-data align-right\">";
    meSend += "            <span class=\"message-data-time\" >10:10 AM, Today<\/span> &nbsp; &nbsp;";
    meSend += "            <span class=\"message-data-name\" >Olia<\/span> <i class=\"fa fa-circle me\"><\/i>";
    meSend += "";
    meSend += "          <\/div>";
    meSend += "          <div class=\"message other-message float-right\">";

    var meGet="";
    meGet += "        <li>";
    meGet += "          <div class=\"message-data\">";
    meGet += "            <span class=\"message-data-name\"><i class=\"fa fa-circle online\"><\/i> Vincent<\/span>";
    meGet += "            <span class=\"message-data-time\">10:12 AM, Today<\/span>";
    meGet += "          <\/div>";
    meGet += "          <div class=\"message my-message\">";



    var endHtml = "          <\/div>";
    endHtml += "        <\/li>";


    var functionList = chatService.functionList;
    vm.cache = chatService.cache;
    vm.cache.currentMessage = '';
    vm.alert = vm.cache.alert;
    vm.yourAccount = null;
    vm.chating = null;
    vm.allAccount = [];
    vm.allRoom = [];
    vm.chatHtml = '';

//    var jsonAccount = $window.sessionStorage.getItem(appConstant.CHAT_APP);
//    if(jsonAccount) {
//      vm.yourAccount = JSON.parse(jsonAccount);
//    }
    vm.changeAccountToChat = changeAccountToChat;
    vm.sendMessage = sendMessage;
    vm.newRoom = newRoom;

    function changeAccountToChat(user) {
      vm.chating = user;
    }

    function sendMessage() {
      var message = vm.cache.currentMessage;
      chatSocket.post('/chat/private', {to: vm.chating.id, msg: message});
      vm.chatHtml += meSend + message + endHtml;
      vm.cache.currentMessage = '';
    }

    function updateRoomList (rooms){
      console.log('all room', rooms);
      vm.allRoom = rooms;
      $scope.$digest();
    }

    function updateUserChatList(accounts) {
      vm.allAccount.length = 0;
      _.forEach(accounts, function (account) {
        if(account.id !== vm.yourAccount.id) {
          vm.allAccount.push(account);
        }
      });
      vm.chating = null;
      if(vm.allAccount.length > 0) {
        vm.chating = vm.allAccount[0];
      }
      $scope.$digest();
    }

    function addAccount(account) {
      vm.allAccount.push(account);
      if(vm.allAccount.length === 1) {
        vm.chating = vm.allAccount[0];
      }
      vm.alert.type = 'success';
      vm.alert.msg = account.name + ' vừa tham gia!...';
      vm.alert.show = true;
    }

    function removeAccount(id) {
      var accountRemove = _.remove(vm.allAccount, function removeAcc(account) {
        return account.id === id;
      });
      if(accountRemove) {
        if(accountRemove.id === vm.chating.id) {
          vm.chating = null;
          if(vm.allAccount.length > 0) {
            vm.chating = vm.allAccount[0];
          }
        }
        vm.alert.type = 'success';
        vm.alert.msg = accountRemove[0].name + ' đã thoát!...';
        vm.alert.show = true;
      }
    }

    function receivePrivateMessage(data) {
      vm.chatHtml += meGet + data.msg || '' + endHtml;
    }

    /**
     * Room
     */
    // Add a new room to the list
    function newRoom($event) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Bạn tên gì?')
        .textContent('Tên của bạn sẽ được sử dụng để trò chuyện.')
        .placeholder('your name')
        .ariaLabel('tên của bạn')
        .targetEvent($event)
        .ok('Đồng ý!')
        .cancel('Bỏ qua');
      $mdDialog.show(confirm)
        .then(function (roomName) {
          if(roomName) {
            io.socket.post('/room', {name: roomName}, function(room) {
              // Create the room HTML
              vm.allRoom.push(room);
              // Join the room
              io.socket.post('room/'+room.id+'/users', {id: vm.yourAccount.id});
              // Select it in the list
              vm.chating = room;
            });
          }
        }, function () {
        });
    }
    //-----------------------------------------------------------------------------------------------------------------

    function getUserAndRoom () {
      // Get the current list of users online.  This will also subscribe us to
      // update and destroy events for the individual users.
      chatSocket.get('/account', updateUserChatList);

      // Get the current list of chat rooms. This will also subscribe us to
      // update and destroy events for the individual rooms.
      chatSocket.get('/room', updateRoomList);
    }

    // Announce that a new user is online--in this somewhat contrived example,
    // this also causes the CREATION of the user, so each window/tab is a new user.
    //if(vm.yourAccount) {
    //  getUserAndRoom();
    //} else {
      chatSocket.get("/account/announce?name=" + yourName, function(yourAccount){
        // $window.sessionStorage.setItem(appConstant.CHAT_APP, JSON.stringify(yourAccount));
        vm.yourAccount = yourAccount;
        getUserAndRoom();
      });
    //}

    // Listen for the "user" event, which will be broadcast when something
    // happens to a user we're subscribed to.  See the "autosubscribe" attribute
    // of the User model to see which messages will be broadcast by default
    // to subscribed sockets.
    chatSocket.on('account', function messageReceived(message) {

      switch (message.verb) {

        // Handle user creation
        case 'created':
          addAccount(message.data);
          break;

        // Handle a user changing their name
        case 'updated':

          // Get the user's old name by finding the <option> in the list with their ID
          // and getting its text.
//          var oldName = $('#user-'+message.id).text();
//
//          // Update the name in the user select list
//          $('#user-'+message.id).text(message.data.name);
//
//          // If we have a private convo with them, update the name there and post a status message in the chat.
//          if ($('#private-username-'+message.id).length) {
//            $('#private-username-'+message.id).html(message.data.name);
//            postStatusMessage('private-messages-'+message.id,oldName+' has changed their name to '+message.data.name);
//          }

          break;

        // Handle user destruction
        case 'destroyed':
          removeAccount(message.id);
          break;

        // Handle private messages.  Only sockets subscribed to the "message" context of a
        // User instance will get this message--see the onConnect logic in config/sockets.js
        // to see where a new user gets subscribed to their own "message" context
        case 'messaged':
//          console.log('message: ', message);
          receivePrivateMessage(message.data);
          break;

        default:
          break;
      }
      $scope.$digest();
    });

    // When the socket disconnects, hide the UI until we reconnect.
    chatSocket.on('disconnect', function(data) {
      console.log('disconnect: ', data)
    });

//    $scope.$on('$destroy', function () {
//      chatSocket.get("/chat/destroyUser?id=" + userId, function(data){
//        console.log('was destroy User: ', data);
//      });
//    })

  }
})();
