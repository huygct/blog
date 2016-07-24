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
    vm.yourAccount = null;
    vm.chatingAccount = {};
    vm.allAccount = [];
    vm.chatHtml = '';

//    var jsonAccount = $window.sessionStorage.getItem(appConstant.CHAT_APP);
//    if(jsonAccount) {
//      vm.yourAccount = JSON.parse(jsonAccount);
//    }
    vm.changeAccountToChat = changeAccountToChat;
    vm.sendMessage = sendMessage;

    function changeAccountToChat(user) {
      vm.chatingAccount = user;
    }

    function sendMessage() {
      var message = $('#message-to-send').val();
      chatSocket.post('/chat/private', {to: vm.chatingAccount.id, msg: message});
      vm.chatHtml += meSend + message + endHtml;
      $('#message-to-send').val("");
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
      $scope.$digest();
    }

    function addAccount(account) {
      vm.allAccount.push(account);
      $scope.$digest();
    }

    function receivePrivateMessage(data) {
      vm.chatHtml += meGet + data.msg || '' + endHtml;
      $scope.$digest();
    }

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
//          removeUser(message.id);
          console.log('destroyed user: ', message);
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
