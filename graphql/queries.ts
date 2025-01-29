import { gql } from "@apollo/client";

export const GET_ALL_ROOMS = gql`
  query {
    rooms {
      id
      gameId
      gameName
      roomGameId
      roomPassword
      playersNum
      mode
      time
      date
      status
      userStats {
        userId
        kills
        timePlayed
        position
        gameUserId
        nickname
      }
    }
  }
`;

export const GET_ROOM_BY_ID = gql`
  query Room($id: Int!) {
    room(id: $id) {
      id
      gameId
      gameName
      roomGameId
      roomPassword
      playersNum
      mode
      time
      date
      status
      userStats {
        userId
        kills
        timePlayed
        position
        gameUserId
        nickname
      }
    }
  }
`;

export const GET_ALL_GAMES = gql`
  query {
    games {
      id
      name
      avatar
    }
  }
`;

export const GET_ALL_BANKS = gql`
  query {
    banks {
      id
      name
    }
  }
`;

export const GET_GAME_BY_ID = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      id
      name
      avatar
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetUsers {
    users {
      id
      name
      avatar
      email
      phone
      rol
      crdBalance
      usdBalance
      userGameDetails {
        gameId
        gameName
        nickname
        gameUserId
      }
      banks {
        id
        bankName
        binancePayId
        bankCode
        userBankPhone
        userDniBank
      }
      deposits {
        id
        userId
        deposit
        depositImage
        rol
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query User($id: Int!) {
    user(id: $id) {
      id
      name
      avatar
      email
      phone
      rol
      crdBalance
      usdBalance
      userGameDetails {
        userId
        gameId
        nickname
        gameUserId
        gameAvatar
        gameName
      }
      banks {
        id
        bankName
        binancePayId
        bankCode
        userBankPhone
        userDniBank
      }
      deposits {
        userId
        deposit
        depositImage
        rol
      }
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query UserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      name
      avatar
      email
      phone
      rol
      crdBalance
      usdBalance
      userGameDetails {
        userId
        gameId
        nickname
        gameUserId
        gameAvatar
        gameName
      }
      banks {
        id
        bankName
        binancePayId
        bankCode
        userBankPhone
        userDniBank
      }
      deposits {
        userId
        deposit
        depositImage
        rol
      }
    }
  }
`;

export const GET_USER_GAMES_BY_ID = gql`
  query UserGameDetails($userId: Int!) {
    userGameDetails(userId: $userId) {
      id
      gameName
      userId
      gameId
      gameUserId
      nickname
    }
  }
`;

export const GET_USERS_DEPOSITS = gql`
  query UsersDeposits {
    UsersDeposits {
      id
      deposit
      depositImage
      userId
      rol
      user {
        id
        name
        avatar
        email
        phone
        rol
        crdBalance
        usdBalance
      }
    }
  }
`;
