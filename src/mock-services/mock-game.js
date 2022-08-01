import { httpConstants } from "../constants";
export default {
  getCreatedGamesList,
  getPurchasedGamesList,
  getTicketHistory,
  getComments,
  getTransactions,
  getTransactionsDetails,
  getAllGames,
};

function getHeaders() {
  return {
    "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
  };
}

async function getCreatedGamesList() {
  let responseData = {
    success: true,
    responseData: [
      {
        gameId: 123,
        gameName: "Super Crossword",
        status: "Sponsored",
        ticketCount: 1000,
        ticketLeft: 450,
        earnings: 1250,
        rating: 3.5,
      },
      {
        gameId: 456,
        gameName: "Rich Mario",
        status: "Unsponsored",
        ticketCount: 1200,
        ticketLeft: 120,
        earnings: 1480,
        rating: 4,
      },
    ],
  };
  return Promise.resolve(responseData);
}

async function getPurchasedGamesList() {
  let responseData = {
    success: true,
    responseData: [
      {
        ticketId: 1319,
        gameName: "Super Crossword",
        status: "Played",
        updatedOn: 1653572463724,
        earnings: 12,
        price: 5,
        rating: 3.8,
      },
    ],
  };
  return Promise.resolve(responseData);
}

async function getTicketHistory() {
  let responseData = {
    success: true,
    responseData: [
      {
        ticketId: 45231,
        transactionDate: "0xf33a59fe24b9a9bc79…9e435",
        purchasedon: 1654597348520,
        playedon: 1654597348520,
      },
      {
        ticketId: 45232,
        transactionDate: "0xf33a59fe24b9a9bc79…9e435",
        purchasedon: 1654597348520,
        playedon: 1654597348520,
      },
      {
        ticketId: 45233,
        transactionDate: "0xf33a59fe24b9a9bc79…9e435",
        purchasedon: 1654597348520,
        playedon: 1654597348520,
      },
      {
        ticketId: 45234,
        transactionDate: "0xf33a59fe24b9a9bc79…9e435",
        purchasedon: 1654597348520,
        playedon: 1654597348520,
      },
    ],
  };
  return Promise.resolve(responseData);
}

async function getTransactions() {
  let responseData = {
    success: true,
    responseData: [
      {
        id: "1",
        name: "John Doe1",
        email: "vishal22@gmailcom",
        mobile: "9874563210",
        features: "Community",
        action: "...",
      },
      {
        id: "2",
        name: "John Doe2",
        email: "vishal22@gmailcom",
        mobile: "9874563210",
        features: "Communityt",
        action: "...",
      },
      {
        id: "3",
        name: "John Doe3",
        email: "vishal22@gmailcom",
        mobile: "9874563210",
        features: "Communityt",
        action: "...",
      },
      {
        id: "4",
        name: "John Doe4",
        email: "vishal22@gmailcom",
        mobile: "9874563210",
        features: "Communityt",
        action: "...",
      },
      {
        id: "5",
        name: "John Doe5",
        email: "vishal22@gmailcom",
        mobile: "9874563210",
        features: "Community",
        action: "...",
      },
      {
        id: "6",
        name: "John Doe6",
        email: "vishal22@gmailcom",
        mobile: "9874563210",
        features: "Community",
        action: "...",
      },
      {
        id: "7",
        name: "John Doe7",
        email: "vishal22@gmailcom",
        mobile: "9874563210",
        features: "Community",
        action: "...",
      },
      {
        id: "8",
        name: "John Doe8",
        email: "vishal22@gmailcom",
        mobile: "9874563210",
        features: "Community",
        action: "...",
      },
      {
        id: "9",
        name: "John Doe9",
        email: "vishal22@gmailcom",
        mobile: "9874563210",
        features: "Community",
        action: "...",
      },
    ],
  };
  return Promise.resolve(responseData);
}

async function getTransactionsDetails(value) {
  let responseData = {
    success: true,
    responseData: [
      {
        id: "1",
        transactionid: "0x53d7a4fffa96…67ea1",
        status: "/images/success.png",
        timestamp: 1654597348520,
        from: "0xea83672a89f6dea85b7be23182722ddde96bedd1",
        to: "0x083d41d6dd21ee938f0c055ca4fb12268df0efac1",
        amount: "$1.00",
        gasfee: "0.00000015eth",
        event: "Ticket Purchase",
        type: "Debit",
        ticketid: "25151",
      },
      {
        id: "2",
        transactionid: "0x53d7a4fffa96…67ea2",
        status: "/images/success.png",
        timestamp: 1654597348520,
        from: "0xea83672a89f6dea85b7be23182722ddde96bedd2",
        to: "0x083d41d6dd21ee938f0c055ca4fb12268df0efac2",
        amount: "$2.00",
        gasfee: "0.00000025eth",
        event: "Ticket Purchase",
        type: "Debit",
        ticketid: "25152",
      },
      {
        id: "3",
        transactionid: "0x53d7a4fffa96…67ea3",
        status: "/images/success.png",
        timestamp: 1654597348520,
        from: "0xea83672a89f6dea85b7be23182722ddde96bedd3",
        to: "0x083d41d6dd21ee938f0c055ca4fb12268df0efac3",
        amount: "$3.00",
        gasfee: "0.00000035eth",
        event: "Ticket Purchase",
        type: "Debit",
        ticketid: "25153",
      },
      {
        id: "4",
        transactionid: "0x53d7a4fffa96…67ea4",
        status: "/images/success.png",
        timestamp: 1654597348520,
        from: "0xea83672a89f6dea85b7be23182722ddde96bedd4",
        to: "0x083d41d6dd21ee938f0c055ca4fb12268df0efac4",
        amount: "$4.00",
        gasfee: "0.00000045eth",
        event: "Ticket Purchase",
        type: "Debit",
        ticketid: "25154",
      },
      {
        id: "5",
        transactionid: "0x53d7a4fffa96…67ea5",
        status: "/images/success.png",
        timestamp: 1654597348520,
        from: "0xea83672a89f6dea85b7be23182722ddde96bedd5",
        to: "0x083d41d6dd21ee938f0c055ca4fb12268df0efac5",
        amount: "$5.00",
        gasfee: "0.00000055eth",
        event: "Ticket Purchase",
        type: "Debit",
        ticketid: "25155",
      },
      {
        id: "6",
        transactionid: "0x53d7a4fffa96…67ea6",
        status: "/images/success.png",
        timestamp: 1654597348520,
        from: "0xea83672a89f6dea85b7be23182722ddde96bedd6",
        to: "0x083d41d6dd21ee938f0c055ca4fb12268df0efac6",
        amount: "$6.00",
        gasfee: "0.00000066eth",
        event: "Ticket Purchase",
        type: "Debit",
        ticketid: "25166",
      },
      {
        id: "7",
        transactionid: "0x53d7a4fffa96…67ea7",
        status: "/images/success.png",
        timestamp: 1654597348520,
        from: "0xea83672a89f6dea85b7be23182722ddde96bedd7",
        to: "0x083d41d6dd21ee938f0c055ca4fb12268df0efac7",
        amount: "$7.00",
        gasfee: "0.00000077eth",
        event: "Ticket Purchase",
        type: "Debit",
        ticketid: "25177",
      },
      {
        id: "8",
        transactionid: "0x53d7a4fffa96…67ea8",
        status: "/images/success.png",
        timestamp: 1654597348520,
        from: "0xea83672a89f6dea85b7be23182722ddde96bedd8",
        to: "0x083d41d6dd21ee938f0c055ca4fb12268df0efac8",
        amount: "$8.00",
        gasfee: "0.00000088eth",
        event: "Ticket Purchase",
        type: "Debit",
        ticketid: "25188",
      },
      {
        id: "9",
        transactionid: "0x53d7a4fffa96…67ea9",
        status: "/images/success.png",
        timestamp: 1654597348520,
        from: "0xea83672a89f6dea85b7be23182722ddde96bedd9",
        to: "0x083d41d6dd21ee938f0c055ca4fb12268df0efac9",
        amount: "$9.00",
        gasfee: "0.00000099eth",
        event: "Ticket Purchase",
        type: "Debit",
        ticketid: "25199",
      },
    ],
  };
  const filteredOutput = responseData.responseData.filter((row) => {
    return row.transactionid.includes(value);
  });
  // console.log("filter, ", filteredOutput, value);
  return Promise.resolve(filteredOutput);
}

async function getComments() {
  let responseData = {
    success: true,
    responseData: [
      {
        name: "Anonymous Player",
        date: 1654597348520,
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque neque purus, imperdiet id varius ac, porta eu ipsum.",
      },
      {
        name: "Alex Dubey",
        date: 1654597348520,
        comment: "Nice Game.. I loved it",
      },
      {
        name: "Winnie Yadav",
        date: 1654597348520,
        comment: "Won a jackpot!!!",
      },
      {
        name: "David Patel",
        date: 1654597348520,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  };
  return Promise.resolve(responseData);
}
async function getAllGames(request) {
  let responseData = {
    success: true,
    responseData: [
      {
        image: "/images/supercrossword.png",
        gameName: "Super Crossword",
        rating: "4.7",
        price: 5,
        content:
          "Bonus edition of this crossword gives you 50% chances of winning the game.",
        addedOn: 1655369124,
      },
      {
        image: "/images/scratchwin.png",
        gameName: "Scratch and Win",
        rating: "4.6",
        price: 2,
        content:
          "Vestibulum aliquam ante quis enim condimentum, ut varius est malesuada.",
        addedOn: 1655282724,
      },
      {
        image: "/images/lotto.png",
        gameName: "Diamond Lotto",
        rating: "4.2",
        price: 10,
        content:
          "Vestibulum aliquam ante quis enim condimentum, ut varius est malesuada.",
        addedOn: 1655196324,
      },
      {
        image: "/images/royalslots.png",
        gameName: "Royal Slots",
        rating: "4.1",
        price: 4,
        content:
          "Vestibulum aliquam ante quis enim condimentum, ut varius est malesuada.",
        addedOn: 1655109924,
      },
      {
        image: "/images/bigwin.png",
        gameName: "Big Win",
        rating: "4.1",
        price: 5,
        content:
          "Vestibulum aliquam ante quis enim condimentum, ut varius est malesuada.",
        addedOn: 1655023524,
      },
      {
        image: "/images/luckyhunt.png",
        gameName: "Lucky Hunt",
        rating: "4.0",
        price: 6,
        content:
          "Vestibulum aliquam ante quis enim condimentum, ut varius est malesuada.",
        addedOn: 1654937124,
      },
    ],
  };

  if (request.sorting === 1)
    responseData.responseData.sort((a, b) => b.price - a.price);
  else if (request.sorting === -1)
    responseData.responseData.sort((a, b) => a.price - b.price);
  else responseData.responseData.sort((a, b) => b.addedOn - a.addedOn);
  return Promise.resolve(responseData);
}
