import { gql } from "@apollo/client";

export const CREATE_ROOM = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(createRoomInput: $input) {
      id
      gameId
      gameName
      roomGameId
      roomPassword
      playersNum
      mode
      time
      date
      usersId
      status
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGame($input: CreateGameInput!) {
    createGame(createGameInput: $input) {
      id
      name
      avatar
    }
  }
`;

export const ASSIGN_GAME_TO_USER = gql`
  mutation assingGameToUser($input: CreateUserGameInput!) {
    assingGameToUser(assingGameToUserInput: $input) {
      id
      gameName
      userId
      gameId
      gameUserId
      nickname
      gameAvatar
    }
  }
`;

export const REMOVE_USER_GAME = gql`
  mutation RemoveUserGame($userId: Int!, $gameId: Int!) {
    removeUserGame(userId: $userId, gameId: $gameId) {
      id
      gameName
      userId
      gameId
      gameUserId
      nickname
      gameAvatar
    }
  }
`;

export const CREATE_BANK_MUTATION = gql`
  mutation CreateBank($name: String!) {
    createBank(createBankInput: { name: $name }) {
      id
      name
    }
  }
`;

export const ASSIGN_BANK_TO_USER = gql`
  mutation AssignBankToUser($input: CreateUserBankInput!) {
    assignBankToUser(assignBankToUser: $input) {
      id
      bankName
    }
  }
`;

export const REMOVE_USER_BANK = gql`
  mutation RemoveUserBank($userId: Int!, $bankId: Int!) {
    removeUserBank(userId: $userId, bankId: $bankId) {
      id
      bankId
      userId
      bankName
      userBankPhone
      bankCode
      userDniBank
      binancePayId
    }
  }
`;

export const UPDATE_USER_STATS = gql`
  mutation UpdateUserStats($roomId: Int!, $stats: [UpdateUserStatsInput!]!) {
    updateUserStats(roomId: $roomId, stats: $stats) {
      status
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      name
      avatar
      email
      password
      phone
      rol
      crdBalance
      usdBalance
    }
  }
`;
