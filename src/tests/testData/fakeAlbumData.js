const fakeAlbumData = [
  {
    name: "album1",
    url: "art url 1",
    UserId: "63534",
    User: {
      name: "artist name 1",
    },
    createAt: "01 Jan 1970 00:00:00 GMT",
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
    UserId: "635364324",
    User: {
      name: "artist name 2",
    },
    createAt: "01 Jan 1970 12:00:00 GMT",
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
];

export default fakeAlbumData;
