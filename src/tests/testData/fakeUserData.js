const fakeUserData = [
  {
    name: "name 1",
    createAt: "01 Jan 1970 00:00:00 GMT",
    email: "me@email.com",
    Albums: [
      {
        name: "album1",
        url: "art url 1",
        Songs: [
          {
            id: "songId1",
            name: "song1",
            position: "0",
          },
          {
            id: "songId2",
            name: "song2",
            position: "1",
          },
        ],
        id: "albumId1",
      },
      {
        name: "album2",
        url: "art url 2",
        Songs: [
          {
            id: "songId3",
            name: "song3",
            position: "1",
          },
          {
            id: "songId4",
            name: "song4",
            position: "0",
          },
        ],
        id: "albumId2",
      },
    ],
  },
  {
    name: "name 2",
    createAt: "01 Jan 1970 00:00:00 GMT",
    email: "me2@email.com",
    Albums: [
      {
        name: "album3",
        url: "art url 4",
        Songs: [
          {
            id: "songId5",
            name: "song5",
            position: "0",
          },
          {
            id: "songId6",
            name: "song6",
            position: "1",
          },
        ],
        id: "albumId3",
      },
      {
        name: "album4",
        url: "art url 4",
        Songs: [
          {
            id: "songId7",
            name: "song7",
            position: "0",
          },
        ],
        id: "albumId4",
      },
    ],
  },
];

export default fakeUserData;
