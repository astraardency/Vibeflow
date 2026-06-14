import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";

// Your Firebase configuration (same as your other files)
const firebaseConfig = {
  apiKey: "AIzaSyDfzOwFTDT2JELQwKZ-FqLZTUYipU06Zck",
  authDomain: "vibeflow-f5cfc.firebaseapp.com",
  projectId: "vibeflow-f5cfc",
  storageBucket: "vibeflow-f5cfc.firebasestorage.app",
  messagingSenderId: "211660575500",
  appId: "1:211660575500:web:d058abb8cd7bcc339e2f29",
  measurementId: "G-3GC6FG65ZM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add your song data to the 'songs' array for each playlist
const customPlaylists = [
  {
    name: "80s & 90s Evergreen Hits",
    creator: "Vibeflow Official",
    img: "https://i.pinimg.com/736x/cf/52/e5/cf52e5ce5a3f982a06c3deab4cd56939.jpg",
    createdAt: Date.now(),
    songs: [
      {
        "id": "song_1",
        "title": "Muthumani Maalai (From \"Chin...",
        "artist": "S. P. Balasubrahmanyam, P. Susheela",
        "img": "",
        "audioUrl": "",
        "duration": 299,
        "album": "Best Hits of Ilaiyaraja ..."
      },
      {
        "id": "song_2",
        "title": "Mannil Indha",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 253,
        "album": "Keladi Kanmani (Ori..."
      },
      {
        "id": "song_3",
        "title": "Nenjukkulae Innarendru (From...",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 294,
        "album": "SPB & Janaki Evergre..."
      },
      {
        "id": "song_4",
        "title": "Malliga Mottu (From \"Sakthivel\")",
        "artist": "Mano, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 303,
        "album": "Best Hits of Ilaiyaraja ..."
      },
      {
        "id": "song_5",
        "title": "Santhaikku Vantha Kili",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 327,
        "album": "Dharma Durai (Origin..."
      },
      {
        "id": "song_6",
        "title": "Enakena Pirandhava",
        "artist": "Deva, S. P. Balasubrahmanyam, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 263,
        "album": "Kizhakku Karai (Origi..."
      },
      {
        "id": "song_7",
        "title": "Indha Maan",
        "artist": "Ilaiyaraaja, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 276,
        "album": "Karakattakkaran (Ori..."
      },
      {
        "id": "song_8",
        "title": "Neethane",
        "artist": "Ilaiyaraaja, Swarnalatha, K. J. Yesudas",
        "img": "",
        "audioUrl": "",
        "duration": 308,
        "album": "Paatu Vaathiyar (Orig..."
      },
      {
        "id": "song_9",
        "title": "Thenmadurai Vaigai Nadhi",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 272,
        "album": "Dharmathin Thalaiva..."
      },
      {
        "id": "song_10",
        "title": "Kooppitta Malar Thedi",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 295,
        "album": "Vasanthakaala Paravai"
      },
      {
        "id": "song_11",
        "title": "Arachcha Santhanam",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 296,
        "album": "Chinna Thambi (Origi..."
      },
      {
        "id": "song_12",
        "title": "Ooru Sanam Thoongidichu",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Mella Thirandhadhu K..."
      },
      {
        "id": "song_13",
        "title": "Koondukkulla (From \"Chinna G...",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 257,
        "album": "SPB & Janaki Evergre..."
      },
      {
        "id": "song_14",
        "title": "Intha Maamanoda (From \"Utha...",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 287,
        "album": "Evergreen Songs of Il..."
      },
      {
        "id": "song_15",
        "title": "Maanguyilae - Duet",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 266,
        "album": "Karakattakkaran (Ori..."
      },
      {
        "id": "song_16",
        "title": "Innum Ennai",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 297,
        "album": "Singaravelan"
      },
      {
        "id": "song_17",
        "title": "Nee Engey En Anbe",
        "artist": "Swarnalatha",
        "img": "",
        "audioUrl": "",
        "duration": 309,
        "album": "Chinna Thambi (Origi..."
      },
      {
        "id": "song_19",
        "title": "Kaattu Kuyil Paattu (From \"Chin...",
        "artist": "Mano, Swarnalatha",
        "img": "",
        "audioUrl": "",
        "duration": 280,
        "album": "Evergreen Songs of Il..."
      },
      {
        "id": "song_20",
        "title": "Thedum Kann Paarvai",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 283,
        "album": "Mella Thirandhadhu K..."
      },
      {
        "id": "song_21",
        "title": "Vaa Vennila Unnaithane (From \"...",
        "artist": "S. P. Balasubrahmanyam, P. Susheela",
        "img": "",
        "audioUrl": "",
        "duration": 279,
        "album": "Endrum Raaja"
      },
      {
        "id": "song_22",
        "title": "Rajathi Raja (From \"Mannan\")",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 298,
        "album": "SPB & Janaki Evergre..."
      },
      {
        "id": "song_23",
        "title": "Adi Poonguyiley (From \"Aranm...",
        "artist": "Mano, Minmini",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "Love Notes by Ilaiyar..."
      },
      {
        "id": "song_24",
        "title": "Ennai Thottu",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 301,
        "album": "Unna Ninachen Paatu..."
      },
      {
        "id": "song_25",
        "title": "Kalyaana Thaen Nilaa",
        "artist": "K. J. Yesudas, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 282,
        "album": "Mounam Sammadha..."
      },
      {
        "id": "song_26",
        "title": "Sangeetha Megam",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 270,
        "album": "Udaya Geetham (Ori..."
      },
      {
        "id": "song_27",
        "title": "Kalyaana Maalai",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 279,
        "album": "Pudhu Pudhu Arthan..."
      },
      {
        "id": "song_28",
        "title": "Thooliyile Ada Vantha - Male V...",
        "artist": "Mano",
        "img": "",
        "audioUrl": "",
        "duration": 282,
        "album": "Chinna Thambi (Origi..."
      },
      {
        "id": "song_29",
        "title": "Valaiyosai",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 275,
        "album": "Sathya (Original Moti..."
      },
      {
        "id": "song_30",
        "title": "Thendral Kaatre",
        "artist": "K. J. Yesudas, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 295,
        "album": "Eeramana Rojave (Ori..."
      },
      {
        "id": "song_31",
        "title": "Enna Saththam Indha Neram",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 257,
        "album": "Punnagai Mannan (Or..."
      },
      {
        "id": "song_32",
        "title": "Pachamala Poovu",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 266,
        "album": "Kizhakku Vaasal (Ori..."
      },
      {
        "id": "song_33",
        "title": "Chinna Chinna Vanna Kuyil",
        "artist": "S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 266,
        "album": "Mouna Ragam (Origi..."
      },
      {
        "id": "song_34",
        "title": "Poovoma Oorgolam",
        "artist": "Swarnalatha, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 291,
        "album": "Chinna Thambi (Origi..."
      },
      {
        "id": "song_35",
        "title": "Shenbagame Shenbagame - M...",
        "artist": "Mano",
        "img": "",
        "audioUrl": "",
        "duration": 277,
        "album": "Enga Ooru Pattukara..."
      },
      {
        "id": "song_36",
        "title": "Aanenna Pennena",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 346,
        "album": "Dharma Durai (Origin..."
      },
      {
        "id": "song_37",
        "title": "Kungumam Manjalukku (From \"...",
        "artist": "K. J. Yesudas, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 299,
        "album": "Mesmerising Tamil So..."
      },
      {
        "id": "song_38",
        "title": "Thaneerilay Mugam",
        "artist": "Mano, Uma Ramanan",
        "img": "",
        "audioUrl": "",
        "duration": 288,
        "album": "Manikuyil"
      },
      {
        "id": "song_39",
        "title": "Annan Enna Thambi Enna",
        "artist": "K. J. Yesudas",
        "img": "",
        "audioUrl": "",
        "duration": 300,
        "album": "Dharma Durai (Origin..."
      },
      {
        "id": "song_40",
        "title": "Keladi Kanmani",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 275,
        "album": "Pudhu Pudhu Arthan..."
      },
      {
        "id": "song_41",
        "title": "Paadi Parandha",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 295,
        "album": "Kizhakku Vaasal (Ori..."
      },
      {
        "id": "song_42",
        "title": "Nilaave Vaa",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 277,
        "album": "Mouna Ragam (Origi..."
      },
      {
        "id": "song_43",
        "title": "Guruvayurappa",
        "artist": "S. P. Balasubrahmanyam, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 274,
        "album": "Pudhu Pudhu Arthan..."
      },
      {
        "id": "song_44",
        "title": "Mandram Vandha",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 287,
        "album": "Mouna Ragam (Origi..."
      },
      {
        "id": "song_45",
        "title": "Adho Andha Nadhiyoram",
        "artist": "S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 349,
        "album": "Ezhai Jaathi"
      },
      {
        "id": "song_46",
        "title": "Shenbagame Shenbagame - D...",
        "artist": "Mano, Ilaiyaraaja",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Enga Ooru Pattukara..."
      },
      {
        "id": "song_47",
        "title": "Kuzhaloodhum Kannanukku",
        "artist": "K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Mella Thirandhadhu K..."
      },
      {
        "id": "song_48",
        "title": "Kadhal Kavithaigal",
        "artist": "S. P. Balasubrahmanyam, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 310,
        "album": "Gopura Vasalile (Orig..."
      },
      {
        "id": "song_49",
        "title": "Ooreallam Un Paattuthaan (Fro...",
        "artist": "K. J. Yesudas",
        "img": "",
        "audioUrl": "",
        "duration": 323,
        "album": "K. J. Yesudas Tamil Hit..."
      },
      {
        "id": "song_50",
        "title": "Oru Maina Maina",
        "artist": "Mano, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 309,
        "album": "Uzhaippali"
      },
      {
        "id": "song_51",
        "title": "Priyasakhi",
        "artist": "Mano, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 307,
        "album": "Gopura Vasalile (Orig..."
      },
      {
        "id": "song_52",
        "title": "Pattu Poove (From \"Chembarut...",
        "artist": "Mano, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "Golden Hits of S. Jana..."
      },
      {
        "id": "song_53",
        "title": "Kannukkul Nooru Nilava (From...",
        "artist": "S. P. Balasubrahmanyam, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 265,
        "album": "Sangeetha Utsavam -..."
      },
      {
        "id": "song_54",
        "title": "Oru Koottu",
        "artist": "Mano, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 227,
        "album": "Padikkathavan (Origi..."
      },
      {
        "id": "song_55",
        "title": "Vaanile Thenila",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 275,
        "album": "Kaakki Sattai (Origin..."
      },
      {
        "id": "song_56",
        "title": "Kuyil Paattu (Happy)",
        "artist": "Swarnalatha",
        "img": "",
        "audioUrl": "",
        "duration": 294,
        "album": "En Rasavin Manasile (..."
      },
      {
        "id": "song_57",
        "title": "Ennathaan Sugamo",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 267,
        "album": "Mappillai (Original M..."
      },
      {
        "id": "song_58",
        "title": "Aagaya Vennilavae",
        "artist": "Uma Ramanan, K. J. Yesudas",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Arangetra Velai (Orig..."
      },
      {
        "id": "song_59",
        "title": "Raasave Unnai Vida (From \"Ara...",
        "artist": "S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 268,
        "album": "Solo Songs of S. Jana..."
      },
      {
        "id": "song_60",
        "title": "Nalam Vazha (From \"Marupadiy...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 300,
        "album": "S. P. Balasubrahmany..."
      },
      {
        "id": "song_61",
        "title": "Endhan Nenjil (From \"Kalaignan\")",
        "artist": "S. Janaki, K. J. Yesudas",
        "img": "",
        "audioUrl": "",
        "duration": 289,
        "album": "K. J. Yesudas Duet So..."
      },
      {
        "id": "song_62",
        "title": "Nila Kayum (From \"Chembarut...",
        "artist": "Mano, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 303,
        "album": "Golden Hits of S. Jana..."
      },
      {
        "id": "song_63",
        "title": "Ila Nenje Vaa (From \"Vanna Van...",
        "artist": "K. J. Yesudas",
        "img": "",
        "audioUrl": "",
        "duration": 327,
        "album": "K. J. Yesudas Tamil Hit..."
      },
      {
        "id": "song_64",
        "title": "Naan Erikarai",
        "artist": "K. J. Yesudas, Swarnalatha",
        "img": "",
        "audioUrl": "",
        "duration": 308,
        "album": "Chinna Thayee"
      },
      {
        "id": "song_65",
        "title": "Paatha Kolusu (From \"Thirumat...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "S. P. Balasubrahmany..."
      },
      {
        "id": "song_66",
        "title": "Medhuva Medhuva (From \"Ann...",
        "artist": "S. P. Balasubrahmanyam, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 260,
        "album": "Sangeetha Utsavam -..."
      },
      {
        "id": "song_67",
        "title": "Vaa Vaa Anbe",
        "artist": "K. J. Yesudas, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "Eeramana Rojave (Ori..."
      },
      {
        "id": "song_68",
        "title": "Kannama Kaadhal Ennum (From...",
        "artist": "Ilaiyaraaja, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 275,
        "album": "Love Notes by Ilaiyar..."
      },
      {
        "id": "song_69",
        "title": "Ennavendru Solvathamma (Fro...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 304,
        "album": "SPB Evergreen Songs"
      },
      {
        "id": "song_70",
        "title": "Aalappol Velappol",
        "artist": "S. P. Balasubrahmanyam, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 308,
        "album": "Yejaman (Original Mo..."
      },
      {
        "id": "song_71",
        "title": "Malaiyoram Veesum Kaathu",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 276,
        "album": "Paadu Nilave (Origina..."
      },
      {
        "id": "song_72",
        "title": "Maane Marghathamey (From \"...",
        "artist": "Mano, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 312,
        "album": "Golden Hits of S. Jana..."
      },
      {
        "id": "song_73",
        "title": "Chinna Chinna Thooral (From \"S...",
        "artist": "S. P. Balasubrahmanyam, Anuradha Sriram",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "Evergreen Songs of Il..."
      },
      {
        "id": "song_74",
        "title": "Pathinettu Vayathu",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 308,
        "album": "Spb & S Janaki - Tamil..."
      },
      {
        "id": "song_75",
        "title": "Sorkathin Vasapadi",
        "artist": "K. J. Yesudas, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 308,
        "album": "Unnai Solli Kutramillai..."
      },
      {
        "id": "song_76",
        "title": "Idho Idho En Pallavi",
        "artist": "S. P. Balasubrahmanyam, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 279,
        "album": "Sigaram (Original Mo..."
      },
      {
        "id": "song_77",
        "title": "Oorellam Saamiyaga (From \"D...",
        "artist": "Ilaiyaraaja",
        "img": "",
        "audioUrl": "",
        "duration": 249,
        "album": "Evergreen Songs Of ..."
      },
      {
        "id": "song_78",
        "title": "Thalattum Poongkaatru",
        "artist": "S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 315,
        "album": "Gopura Vasalile (Orig..."
      },
      {
        "id": "song_79",
        "title": "Unn Manasile Paattuthaan (Hap...",
        "artist": "Mano, Ilaiyaraaja",
        "img": "",
        "audioUrl": "",
        "duration": 264,
        "album": "Paandi Nattu Thanga..."
      },
      {
        "id": "song_80",
        "title": "Karutha Machan",
        "artist": "S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 281,
        "album": "Pudhu Nellu Pudhu N..."
      },
      {
        "id": "song_81",
        "title": "Oru Kadhal Devadhai",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 269,
        "album": "Idhaya Thaamarai (O..."
      },
      {
        "id": "song_82",
        "title": "Vanithamani",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Vikram (Original Moti..."
      },
      {
        "id": "song_83",
        "title": "Panivizhum Iravu",
        "artist": "S. Janaki, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 273,
        "album": "Mouna Ragam (Origi..."
      },
      {
        "id": "song_84",
        "title": "Innum Ennai Enna (From \"Singar...",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 297,
        "album": "SPB & Janaki Evergre..."
      },
      {
        "id": "song_85",
        "title": "Kannan Vanthu",
        "artist": "S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 251,
        "album": "Rettai Vaal Kuruvi (Ori..."
      },
      {
        "id": "song_86",
        "title": "Endha Pennilum Illada Onru",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 309,
        "album": "Captain Magal"
      },
      {
        "id": "song_87",
        "title": "Meenamma Meenamma",
        "artist": "Mano, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 285,
        "album": "Rajathi Raja (Original ..."
      },
      {
        "id": "song_88",
        "title": "Thodi Ragam",
        "artist": "K. J. Yesudas, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 296,
        "album": "Managara Kaval (Ori..."
      },
      {
        "id": "song_89",
        "title": "Maalayil Yaaro",
        "artist": "Ilaiyaraaja, Swarnalatha",
        "img": "",
        "audioUrl": "",
        "duration": 331,
        "album": "Chatriyan (Original M..."
      },
      {
        "id": "song_90",
        "title": "Adi Raakumuthu",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 311,
        "album": "Yejaman (Original Mo..."
      },
      {
        "id": "song_91",
        "title": "Adiye Adi Chinnapulla",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 291,
        "album": "Sindhoo Nadi Poo"
      },
      {
        "id": "song_92",
        "title": "Nilave Mugam",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 307,
        "album": "Yejaman (Original Mo..."
      },
      {
        "id": "song_93",
        "title": "Oru Naalum",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 361,
        "album": "Yejaman (Original Mo..."
      },
      {
        "id": "song_94",
        "title": "Paadu Nilavae",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 319,
        "album": "Udaya Geetham (Ori..."
      },
      {
        "id": "song_95",
        "title": "Ennodu Paattu Paadungal",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 359,
        "album": "Udaya Geetham (Ori..."
      },
      {
        "id": "song_96",
        "title": "Thene Thenpaandi - Male",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 277,
        "album": "Udaya Geetham (Ori..."
      },
      {
        "id": "song_97",
        "title": "Uthaya Geetham",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 281,
        "album": "Udaya Geetham (Ori..."
      },
      {
        "id": "song_98",
        "title": "Senguruvi",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 357,
        "album": "Thiru Moorthy"
      },
      {
        "id": "song_99",
        "title": "Nee Pathi Naan Pathi",
        "artist": "K. J. Yesudas, Uma Ramanan",
        "img": "",
        "audioUrl": "",
        "duration": 283,
        "album": "Keladi Kannmanii (Ori..."
      },
      {
        "id": "song_100",
        "title": "Engirundho Ilangkuyilin (From \"...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "Evergreen Songs of S..."
      },
      {
        "id": "song_101",
        "title": "Sollividu Velli Nilavae (From \"A...",
        "artist": "Mano, Swarnalatha",
        "img": "",
        "audioUrl": "",
        "duration": 301,
        "album": "Evergreen Songs of S..."
      },
      {
        "id": "song_102",
        "title": "Maanam Idi Idikka",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "Unna Ninachen Paatu ..."
      },
      {
        "id": "song_103",
        "title": "Ore Murai Un Dharisanam",
        "artist": "Ilaiyaraaja, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 262,
        "album": "En Jeevan Paaduthu (..."
      },
      {
        "id": "song_104",
        "title": "Mana Maalaiyum",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 272,
        "album": "Vaathiyaar Veettu Pill..."
      },
      {
        "id": "song_105",
        "title": "Ammadi Idhuthan Kathala (Fro...",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 320,
        "album": "S.P. Balasubrahmany..."
      },
      {
        "id": "song_106",
        "title": "Poothathu Poonthoppu",
        "artist": "Mano, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 289,
        "album": "Thanga Manasukkara..."
      },
      {
        "id": "song_107",
        "title": "Poovana",
        "artist": "Mano, Vani Jairam",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Ponmana Selvan (Ori..."
      },
      {
        "id": "song_108",
        "title": "Mayanginen Solla Thayanginen",
        "artist": "Jayachandran, Susheela",
        "img": "",
        "audioUrl": "",
        "duration": 256,
        "album": "Naane Raja Naane M..."
      },
      {
        "id": "song_109",
        "title": "Maniyae Manikuyilae (From \"N...",
        "artist": "Mano, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 340,
        "album": "Golden Hits of S. Jana..."
      },
      {
        "id": "song_110",
        "title": "Un Paarvayil - Male",
        "artist": "K. J. Yesudas",
        "img": "",
        "audioUrl": "",
        "duration": 246,
        "album": "Amman Kovil Kizhaka..."
      },
      {
        "id": "song_111",
        "title": "Thendral Vandhu",
        "artist": "Ilaiyaraaja, K. J. Yesudas, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 256,
        "album": "Thendrale Ennai Thod..."
      },
      {
        "id": "song_112",
        "title": "Thaana Vantha",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 300,
        "album": "Ooru Vittu Ooru Van..."
      },
      {
        "id": "song_113",
        "title": "Chittu Kuruvi",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 266,
        "album": "Chinna Veedu (Origin..."
      },
      {
        "id": "song_114",
        "title": "Ding Dang Dang",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 297,
        "album": "Panakkaran (Original..."
      },
      {
        "id": "song_115",
        "title": "Thoongatha Vizhigal",
        "artist": "K. J. Yesudas, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 280,
        "album": "Agni Natchathiram (..."
      },
      {
        "id": "song_116",
        "title": "Maasi Masam Alana Ponnu",
        "artist": "K. J. Yesudas, Swarnalatha",
        "img": "",
        "audioUrl": "",
        "duration": 300,
        "album": "Dharma Durai (Origin..."
      },
      {
        "id": "song_117",
        "title": "Adi Aasa Machan",
        "artist": "Swarnalatha",
        "img": "",
        "audioUrl": "",
        "duration": 302,
        "album": "Kummi Pattu"
      },
      {
        "id": "song_118",
        "title": "Poonguyil Ragame",
        "artist": "Sirpy, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 233,
        "album": "Naan Pesa Ninepadell..."
      },
      {
        "id": "song_119",
        "title": "Vaanam Idi Idikka (From \"Unna ...",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "SPB & Janaki Evergre..."
      },
      {
        "id": "song_120",
        "title": "Valli Valli Ena (From \"Deiva Vakk...",
        "artist": "Ilaiyaraaja, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 292,
        "album": "Evergreen Songs of K..."
      },
      {
        "id": "song_121",
        "title": "Nooru Varusham - Male Version",
        "artist": "Mano",
        "img": "",
        "audioUrl": "",
        "duration": 267,
        "album": "Panakkaran (Original..."
      },
      {
        "id": "song_122",
        "title": "Rasathi Unnai",
        "artist": "P. Jayachandran",
        "img": "",
        "audioUrl": "",
        "duration": 264,
        "album": "Vaidehi Kathirunthal (..."
      },
      {
        "id": "song_123",
        "title": "Neela Kuyile Solai Kuyile",
        "artist": "Arunmozhi, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 269,
        "album": "Soora Samhaaram (..."
      },
      {
        "id": "song_124",
        "title": "Adho Mega Oorvalam",
        "artist": "Mano, Sunanda",
        "img": "",
        "audioUrl": "",
        "duration": 309,
        "album": "Eeramana Rojave (Ori..."
      },
      {
        "id": "song_125",
        "title": "Mani Osai",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 279,
        "album": "Payanangal Mudivat..."
      },
      {
        "id": "song_126",
        "title": "Ilaya Nila Pozhigirathe",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 281,
        "album": "Payanangal Mudivat..."
      },
      {
        "id": "song_127",
        "title": "O Butterfly",
        "artist": "S. P. Balasubrahmanyam, Asha Bho...",
        "img": "",
        "audioUrl": "",
        "duration": 301,
        "album": "90's Love Special Vol ..."
      },
      {
        "id": "song_128",
        "title": "Unna Partha",
        "artist": "K. S. Chithra, Malaysia Vasudevan",
        "img": "",
        "audioUrl": "",
        "duration": 290,
        "album": "Athisaya Piravi (Origi..."
      },
      {
        "id": "song_129",
        "title": "Adi Vaanmathi",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 269,
        "album": "Siva (Original Motion ..."
      },
      {
        "id": "song_130",
        "title": "Soru Kondu Pora",
        "artist": "K. S. Chithra, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 232,
        "album": "En Aasai Machan (Ori..."
      },
      {
        "id": "song_131",
        "title": "Kalaivaniyo Raniyo (From \"Villu ...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "S. P. Balasubrahmany..."
      },
      {
        "id": "song_132",
        "title": "Ennullae (From \"Valli\")",
        "artist": "Swarnalatha",
        "img": "",
        "audioUrl": "",
        "duration": 414,
        "album": "Swarnalatha Songs V..."
      },
      {
        "id": "song_133",
        "title": "Muthu Mani (From \"Adharmam\")",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 268,
        "album": "Murali Evergreen Son..."
      },
      {
        "id": "song_134",
        "title": "Oru Sandhana Kaattukkulle",
        "artist": "Ilaiyaraaja, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 326,
        "album": "Ellame En Rasathan"
      },
      {
        "id": "song_135",
        "title": "Thenpaandi Thamizhe - Duet",
        "artist": "Ilaiyaraaja, K. J. Yesudas, K. S. Chithra",
        "img": "",
        "audioUrl": "",
        "duration": 281,
        "album": "Paasa Paravaigal (Ori..."
      },
      {
        "id": "song_136",
        "title": "Poradada",
        "artist": "Ilaiyaraaja, Malaysia Vasudevan",
        "img": "",
        "audioUrl": "",
        "duration": 268,
        "album": "Alai Osai (Original Mo..."
      }
    ]
  },
  {
    name: "S.P.B Melodies",
    creator: "Vibeflow Official",
    img: "https://i.pinimg.com/736x/23/42/87/234287b89bd94e1acc6a14c46d8d4db3.jpg",
    createdAt: Date.now(),
    songs: [
      {
        "id": "song_1",
        "title": "Valaiyosai",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 275,
        "album": "Sathya (Original Moti..."
      },
      {
        "id": "song_2",
        "title": "Enna Saththam Indha Neram",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 259,
        "album": "Punnagai Mannan (Or..."
      },
      {
        "id": "song_3",
        "title": "Ennavendru Solvathamma (Fro...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 304,
        "album": "SPB Evergreen Songs"
      },
      {
        "id": "song_4",
        "title": "Saami Kitta Solli (From \"Aavara...",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 276,
        "album": "SPB & Janaki Evergre..."
      },
      {
        "id": "song_5",
        "title": "Nilavae Mugam (From \"Yejama...",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "Best Hits of Ilaiyaraja ..."
      },
      {
        "id": "song_6",
        "title": "Mannil Indha",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 266,
        "album": "Keladi Kanmani (Origi..."
      },
      {
        "id": "song_7",
        "title": "Sangeetha Megam",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 270,
        "album": "Udaya Geetham (Ori..."
      },
      {
        "id": "song_8",
        "title": "Thenmadurai Vaigai Nadhi",
        "artist": "S. P. Balasubrahmanyam, P. Susheel...",
        "img": "",
        "audioUrl": "",
        "duration": 272,
        "album": "Dharmathin Thalaiva..."
      },
      {
        "id": "song_9",
        "title": "Keladi Kanmani",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 275,
        "album": "Pudhu Pudhu Arthan..."
      },
      {
        "id": "song_10",
        "title": "Konji Konji (From \"Veera\")",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 363,
        "album": "S. P. Balasubrahmany..."
      },
      {
        "id": "song_11",
        "title": "Muthumani Maalai (From \"Chin...",
        "artist": "S. P. Balasubrahmanyam, P. Susheela",
        "img": "",
        "audioUrl": "",
        "duration": 299,
        "album": "Best Hits of Ilaiyaraja ..."
      },
      {
        "id": "song_12",
        "title": "Guruvayurappa",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 274,
        "album": "Pudhu Pudhu Arthan..."
      },
      {
        "id": "song_13",
        "title": "Nan pogiren (From \"Naanayam\")",
        "artist": "James Vasanthan, S. P. Balasubrah...",
        "img": "",
        "audioUrl": "",
        "duration": 392,
        "album": "MasterWorks - Chitra"
      },
      {
        "id": "song_14",
        "title": "Parthu Parthu (From \"Nee Varu...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 272,
        "album": "The Legend Spb"
      },
      {
        "id": "song_15",
        "title": "Anjali Anjali",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 487,
        "album": "Duet"
      },
      {
        "id": "song_16",
        "title": "Pachamala Poovu",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 266,
        "album": "Kizhakku Vaasal (Ori..."
      },
      {
        "id": "song_17",
        "title": "Sempoove Poove (From \"Sirai ...",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 295,
        "album": "SPB & K.S Chithra Eve..."
      },
      {
        "id": "song_18",
        "title": "Thedum Kann Paarvai",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 283,
        "album": "Mella Thirandhadhu K..."
      },
      {
        "id": "song_19",
        "title": "En Kaadhale (From \"Duet\")",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 359,
        "album": "SPB Evergreen Songs"
      },
      {
        "id": "song_20",
        "title": "Mun Paniya",
        "artist": "S. P. Balasubrahmanyam, Malgudi S...",
        "img": "",
        "audioUrl": "",
        "duration": 340,
        "album": "Nandha (Original Mot..."
      },
      {
        "id": "song_21",
        "title": "Malare",
        "artist": "Vidyasagar, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 305,
        "album": "Karna (Original Motio..."
      },
      {
        "id": "song_22",
        "title": "Anbay",
        "artist": "S. P. Balasubrahmanyam, O.S. Arun,...",
        "img": "",
        "audioUrl": "",
        "duration": 342,
        "album": "Kadhal Desam"
      },
      {
        "id": "song_23",
        "title": "Nalam Nalamariya",
        "artist": "Deva, S. P. Balasubrahmanyam, An...",
        "img": "",
        "audioUrl": "",
        "duration": 287,
        "album": "Kadhal Kottai (Origin..."
      },
      {
        "id": "song_24",
        "title": "Thoda Thoda",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 308,
        "album": "Indira"
      },
      {
        "id": "song_25",
        "title": "Yaaro - Duet Version",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 314,
        "album": "Chennai-600028 (Ori..."
      },
      {
        "id": "song_26",
        "title": "Aalappol Velappol (From \"Yeja...",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 307,
        "album": "SPB & K.S Chithra Eve..."
      },
      {
        "id": "song_27",
        "title": "Nalam Vazha (From \"Marupadiy...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 300,
        "album": "S. P. Balasubrahmany..."
      },
      {
        "id": "song_28",
        "title": "Naanaga Naanillai Thaye (Ilaiya...",
        "artist": "Ilaiyaraaja",
        "img": "",
        "audioUrl": "",
        "duration": 272,
        "album": "Thoongathe Thambi ..."
      },
      {
        "id": "song_29",
        "title": "Maanguyilae - Solo",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Karakattakkaran (Ori..."
      },
      {
        "id": "song_30",
        "title": "Ayyayo",
        "artist": "G. V. Prakash, S. P. Balasubrahmany...",
        "img": "",
        "audioUrl": "",
        "duration": 324,
        "album": "Aadukalam (Original ..."
      },
      {
        "id": "song_31",
        "title": "Kaadhal Rojave",
        "artist": "S. P. Balasubrahmanyam, Sujatha",
        "img": "",
        "audioUrl": "",
        "duration": 300,
        "album": "Roja"
      },
      {
        "id": "song_32",
        "title": "Velli Malare (From \"Jodi\")",
        "artist": "S. P. Balasubrahmanyam, Mahalaks...",
        "img": "",
        "audioUrl": "",
        "duration": 389,
        "album": "S.P.Balasubramaniya..."
      },
      {
        "id": "song_33",
        "title": "Azhagu Azhagu Nee Nadanthal",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 316,
        "album": "Baasha (Tamil) (Origin..."
      },
      {
        "id": "song_34",
        "title": "Medhuva Medhuva (From \"Ann...",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 260,
        "album": "Sangeetha Utsavam -..."
      },
      {
        "id": "song_35",
        "title": "Neela Vaanam Odaiyil",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 275,
        "album": "Vazhve Maayam (Ori..."
      },
      {
        "id": "song_36",
        "title": "Suthi Suthi (From \"Padayappa\")",
        "artist": "A.R. Rahman, S. P. Balasubrahmany...",
        "img": "",
        "audioUrl": "",
        "duration": 386,
        "album": "Ever Green Love Son..."
      },
      {
        "id": "song_37",
        "title": "Unna Nenachen",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 280,
        "album": "Apoorva Sagodharar..."
      },
      {
        "id": "song_38",
        "title": "Kadhalenum (From Kadhalar Dhi...",
        "artist": "S. P. Balasubrahmanyam, Swarnala...",
        "img": "",
        "audioUrl": "",
        "duration": 400,
        "album": "S.P.B and K.J.Jesudas ..."
      },
      {
        "id": "song_39",
        "title": "Kaathalin Deepam Ondru - Mal...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 276,
        "album": "Thambikku Entha Oo..."
      },
      {
        "id": "song_40",
        "title": "Oru Kolakkili",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 299,
        "album": "Uzhaippali"
      },
      {
        "id": "song_41",
        "title": "Marugo Marugo",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 347,
        "album": "Vettri Vizhaa (Origina..."
      },
      {
        "id": "song_42",
        "title": "Puthu Maappillaikku",
        "artist": "S. P. Balasubrahmanyam, S. P. Sailaja",
        "img": "",
        "audioUrl": "",
        "duration": 277,
        "album": "Apoorva Sagodharar..."
      },
      {
        "id": "song_43",
        "title": "Kandu Pudichen",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Guru Sishyan (Origin..."
      },
      {
        "id": "song_44",
        "title": "Vaa Vennila Unnaithane",
        "artist": "Ilaiyaraaja, Viswanathan, Vali, Gan...",
        "img": "",
        "audioUrl": "",
        "duration": 279,
        "album": "Mella Thirandhadhu K..."
      },
      {
        "id": "song_45",
        "title": "Koo Koo Endru Kuyil",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 276,
        "album": "Kaadhal Parisu (Origi..."
      },
      {
        "id": "song_46",
        "title": "Singalathu Chinnakuyile",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 258,
        "album": "Punnagai Mannan (Or..."
      },
      {
        "id": "song_47",
        "title": "Kanmaniyae Pesu",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 264,
        "album": "Kaakki Sattai (Origin..."
      },
      {
        "id": "song_48",
        "title": "Meendum Meendum Vaa",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Vikram (Original Moti..."
      },
      {
        "id": "song_49",
        "title": "Eduthu Naan Vidava",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 280,
        "album": "Pudhu Pudhu Arthan..."
      },
      {
        "id": "song_50",
        "title": "Idhayamae Idhayamae (From \"I...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 309,
        "album": "S. P. Balasubrahmany..."
      },
      {
        "id": "song_51",
        "title": "Neethane Enthan Pon Vasantha...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 259,
        "album": "Ninaivellam Nithya (O..."
      },
      {
        "id": "song_52",
        "title": "Kadhal Vaanile",
        "artist": "S. P. Balasubrahmanyam, Preethi",
        "img": "",
        "audioUrl": "",
        "duration": 341,
        "album": "Raasaiyya (Original M..."
      },
      {
        "id": "song_53",
        "title": "Vaanile Thenila",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 275,
        "album": "Kaakki Sattai (Origin..."
      },
      {
        "id": "song_54",
        "title": "Mandram Vandha",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 287,
        "album": "Mouna Ragam (Origi..."
      },
      {
        "id": "song_55",
        "title": "Pesa Koodathu",
        "artist": "S. P. Balasubrahmanyam, P. Susheela",
        "img": "",
        "audioUrl": "",
        "duration": 274,
        "album": "Adutha Varisu (Origin..."
      },
      {
        "id": "song_56",
        "title": "Ithazhil Kathai",
        "artist": "S. P. Balasubrahmanyam, Ilaiyaraaja",
        "img": "",
        "audioUrl": "",
        "duration": 322,
        "album": "Unnal Mudiyum Tham..."
      },
      {
        "id": "song_57",
        "title": "Paadi Parandha",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 295,
        "album": "Kizhakku Vaasal (Ori..."
      },
      {
        "id": "song_58",
        "title": "Nilaave Vaa",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 277,
        "album": "Mouna Ragam (Origi..."
      },
      {
        "id": "song_59",
        "title": "Naanaga Naanillai Thaye (Versi...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 272,
        "album": "Ulaganaayagan Spec..."
      },
      {
        "id": "song_60",
        "title": "Chinnamani Kuyile",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 265,
        "album": "Amman Kovil Kizhaka..."
      },
      {
        "id": "song_61",
        "title": "Nenjukkulae Innarendru (From...",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 294,
        "album": "SPB & Janaki Evergre..."
      },
      {
        "id": "song_62",
        "title": "Kadhal Kavithaigal",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 310,
        "album": "Gopura Vasalile (Orig..."
      },
      {
        "id": "song_63",
        "title": "Chinna Chinna Thooral",
        "artist": "S. P. Balasubrahmanyam, Anuradha",
        "img": "",
        "audioUrl": "",
        "duration": 307,
        "album": "Senthamizh Paattu (..."
      },
      {
        "id": "song_64",
        "title": "Kalyaana Maalai",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 279,
        "album": "Pudhu Pudhu Arthan..."
      },
      {
        "id": "song_65",
        "title": "Arachcha Santhanam",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 296,
        "album": "Chinna Thambi (Origi..."
      },
      {
        "id": "song_66",
        "title": "Malaiyoram Veesum Kaathu",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 276,
        "album": "Paadu Nilave (Origina..."
      },
      {
        "id": "song_67",
        "title": "Poovoma Oorgolam",
        "artist": "Swarnalatha, S. P. Balasubrahmany...",
        "img": "",
        "audioUrl": "",
        "duration": 291,
        "album": "Chinna Thambi (Origi..."
      },
      {
        "id": "song_68",
        "title": "Maanuthu Mandhayile (From \"K...",
        "artist": "S. P. Balasubrahmanyam, Sasirekha",
        "img": "",
        "audioUrl": "",
        "duration": 316,
        "album": "Hits of A. R. Rahman V..."
      },
      {
        "id": "song_69",
        "title": "Innum Ennai Enna (From \"Singar...",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 297,
        "album": "SPB & Janaki Evergre..."
      },
      {
        "id": "song_70",
        "title": "Endha Pennilum Illada Onru (Fr...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 309,
        "album": "Sangeetha Utsavam -..."
      },
      {
        "id": "song_71",
        "title": "Kannukkul Nooru Nilava (From...",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 265,
        "album": "Sangeetha Utsavam -..."
      },
      {
        "id": "song_72",
        "title": "Kaadhal Kaadhal",
        "artist": "Sirpy, S. P. Balasubrahmanyam, K. S...",
        "img": "",
        "audioUrl": "",
        "duration": 299,
        "album": "Poochudava (Original..."
      },
      {
        "id": "song_73",
        "title": "Yenthen Vanin",
        "artist": "A.R. Rahman, S. P. Balasubrahmany...",
        "img": "",
        "audioUrl": "",
        "duration": 368,
        "album": "Kaadhal Virus (Origin..."
      },
      {
        "id": "song_74",
        "title": "Theenadai",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 408,
        "album": "En Swasa Kaatre"
      },
      {
        "id": "song_75",
        "title": "Ilaya Nila Pozhigirathe",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 281,
        "album": "Payanangal Mudivat..."
      },
      {
        "id": "song_76",
        "title": "Sundari",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 429,
        "album": "Spb & S Janaki - Tamil..."
      },
      {
        "id": "song_77",
        "title": "Vannam Konda",
        "artist": "S. P. Balasubrahmanyam, S. P. Sailaja",
        "img": "",
        "audioUrl": "",
        "duration": 305,
        "album": "Sigaram (Original Mo..."
      },
      {
        "id": "song_78",
        "title": "Minnalea En Vazhvin",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 336,
        "album": "May Madham"
      },
      {
        "id": "song_79",
        "title": "Mettuppodu Mettuppodu",
        "artist": "S. P. Balasubrahmanyam, P. Susheela",
        "img": "",
        "audioUrl": "",
        "duration": 496,
        "album": "Duet"
      },
      {
        "id": "song_80",
        "title": "Manasukkul Oru Puyal",
        "artist": "S. P. Balasubrahmanyam, Sadhana ...",
        "img": "",
        "audioUrl": "",
        "duration": 325,
        "album": "Star"
      },
      {
        "id": "song_81",
        "title": "Thanga Thamarai Magalae (Fro...",
        "artist": "S. P. Balasubrahmanyam, Malgudi S...",
        "img": "",
        "audioUrl": "",
        "duration": 303,
        "album": "Hits Of Vairamuthu"
      },
      {
        "id": "song_82",
        "title": "Panivizhum Iravu",
        "artist": "S. Janaki, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 273,
        "album": "Mouna Ragam (Origi..."
      },
      {
        "id": "song_83",
        "title": "Kannukkul Nooru Nilava",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 265,
        "album": "Vedam Pudhithu"
      },
      {
        "id": "song_84",
        "title": "Poththi Vachcha",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 258,
        "album": "Mann Vasanai (Origin..."
      },
      {
        "id": "song_85",
        "title": "Madai Thiranthu",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 261,
        "album": "SPB Rain Melodies (Ta..."
      },
      {
        "id": "song_86",
        "title": "Panivizhum Malar Vanam",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 274,
        "album": "Ninaivellam Nithya (O..."
      },
      {
        "id": "song_87",
        "title": "En Veetu Thotathil (From \"Gent...",
        "artist": "S. P. Balasubrahmanyam, Sujatha",
        "img": "",
        "audioUrl": "",
        "duration": 244,
        "album": "Musical Legends"
      },
      {
        "id": "song_88",
        "title": "Illamai Etho Ehto",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 349,
        "album": "Sakalakala Vallavan (..."
      },
      {
        "id": "song_89",
        "title": "Idho Idho En Pallavi",
        "artist": "S. P. Balasubrahmanyam, K. S. Chith...",
        "img": "",
        "audioUrl": "",
        "duration": 279,
        "album": "Sigaram (Original Mo..."
      },
      {
        "id": "song_90",
        "title": "Senguruvi",
        "artist": "S. P. Balasubrahmanyam, S. Janaki",
        "img": "",
        "audioUrl": "",
        "duration": 357,
        "album": "Thiru Moorthy"
      },
      {
        "id": "song_91",
        "title": "Pungatru Un Peru Solla",
        "artist": "K. S. Chithra, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 274,
        "album": "Vettri Vizhaa (Origina..."
      },
      {
        "id": "song_92",
        "title": "Ithu Oru Ponmalai",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 259,
        "album": "Nizhalgal"
      },
      {
        "id": "song_93",
        "title": "Kanmaniye Kanmaniye",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 363,
        "album": "Chinna Vathiyar (Orig..."
      },
      {
        "id": "song_94",
        "title": "Vanithamani",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 273,
        "album": "Vikram (Original Moti..."
      },
      {
        "id": "song_95",
        "title": "Aalappol Velappol (From \"Ejjam...",
        "artist": "Vaali, R. V. Udayakumar, S. P. Balasu...",
        "img": "",
        "audioUrl": "",
        "duration": 305,
        "album": "Ejjaman (Original Mot..."
      },
      {
        "id": "song_96",
        "title": "Oru Naalum (From \"Ejjaman\" )",
        "artist": "R. V. Udayakumar, Vaali, S. P. Balasu...",
        "img": "",
        "audioUrl": "",
        "duration": 359,
        "album": "Ejjaman (Original Mot..."
      },
      {
        "id": "song_97",
        "title": "Kaadhal Vaanilae (From \"Raasai...",
        "artist": "S. P. Balasubrahmanyam, Pavadhari...",
        "img": "",
        "audioUrl": "",
        "duration": 341,
        "album": "Everlasting Tamil Lov..."
      },
      {
        "id": "song_98",
        "title": "Sivappu Lolakku",
        "artist": "Deva, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 321,
        "album": "Kadhal Kottai (Origin..."
      },
      {
        "id": "song_99",
        "title": "Engeyum Eppothum - From \"Po...",
        "artist": "G. V. Prakash, Yogi. B, Kaviyarasu K...",
        "img": "",
        "audioUrl": "",
        "duration": 289,
        "album": "Engeyum Eppothum (..."
      },
      {
        "id": "song_100",
        "title": "Thaene Thenpaandi - Male",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 273,
        "album": "Udhaya Geetham (Or..."
      },
      {
        "id": "song_101",
        "title": "Sendhoora Poove",
        "artist": "S. P. Balasubrahmanyam, Sasireka",
        "img": "",
        "audioUrl": "",
        "duration": 274,
        "album": "Sendhoora Poove (Or..."
      },
      {
        "id": "song_102",
        "title": "Yenna Azhago (From \"Love Tod...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 296,
        "album": "The Legend Spb"
      },
      {
        "id": "song_103",
        "title": "Annaikilli",
        "artist": "S. P. Balasubrahmanyam, Baby",
        "img": "",
        "audioUrl": "",
        "duration": 310,
        "album": "Rickshaw Mama"
      },
      {
        "id": "song_104",
        "title": "Kalaivaniyo Raniyo",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 306,
        "album": "Villu Pattukaran (Orig..."
      },
      {
        "id": "song_105",
        "title": "Naan Thandhanandha Paatu (Fr...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 254,
        "album": "Sangeetha Utsavam -..."
      },
      {
        "id": "song_106",
        "title": "Poonguyil Ragame (From \"Naa...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 233,
        "album": "Sangeetha Utsavam -..."
      },
      {
        "id": "song_107",
        "title": "Oru Kadhal",
        "artist": "Gangai Amaran, S. P. Balasubrahma...",
        "img": "",
        "audioUrl": "",
        "duration": 292,
        "album": "Chinna Thambi Periya..."
      },
      {
        "id": "song_108",
        "title": "Thalukki Thalukki",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 301,
        "album": "Kizhakku Vaasal (Ori..."
      },
      {
        "id": "song_109",
        "title": "Sandhana Kaatre (From \"Thani...",
        "artist": "Ilaiyaraaja, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 283,
        "album": "Romantic Songs of Ra..."
      },
      {
        "id": "song_110",
        "title": "Mounamey",
        "artist": "Vidyasagar, S. P. Balasubrahmanya...",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Anbe Sivam (Original..."
      },
      {
        "id": "song_111",
        "title": "Penn Oruthi",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 309,
        "album": "Gemini (Original Moti..."
      },
      {
        "id": "song_112",
        "title": "Endha Pennilum Illada Onru",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 309,
        "album": "Captain Magal"
      },
      {
        "id": "song_113",
        "title": "Enge En Punnagail (From \"Thaal...",
        "artist": "S. P. Balasubrahmanyam, Shoba",
        "img": "",
        "audioUrl": "",
        "duration": 382,
        "album": "S.P.Balasubramaniya..."
      },
      {
        "id": "song_114",
        "title": "Povoma Oorkolam",
        "artist": "Ilaiyaraaja, Swarnalatha, S. P. Balas...",
        "img": "",
        "audioUrl": "",
        "duration": 287,
        "album": "Chinna Thambi (Origi..."
      }
    ]
  },
  {
    name: "Hiphop Tamizha",
    creator: "Vibeflow Official",
    img: "https://i.pinimg.com/736x/08/bf/f9/08bff9f28c2739618c7837e8f8f183f2.jpg",
    createdAt: Date.now(),
    songs: [
      {
        "id": "song_1",
        "title": "Sakkarakatti",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 189,
        "album": "Meesaya Murukku (O..."
      },
      {
        "id": "song_2",
        "title": "Paisa Note (From \"Comali\")",
        "artist": "Hiphop Tamizha, Pradeep Rangana...",
        "img": "",
        "audioUrl": "",
        "duration": 185,
        "album": "Paisa Note (From \"Co..."
      },
      {
        "id": "song_3",
        "title": "Quarantine & Chill",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 153,
        "album": "Quarantine & Chill"
      },
      {
        "id": "song_4",
        "title": "Kadhal Cricket - Love (Not Out)",
        "artist": "Hiphop Tamizha, Kharesma Ravicha...",
        "img": "",
        "audioUrl": "",
        "duration": 214,
        "album": "Thani Oruvan (Origin..."
      },
      {
        "id": "song_5",
        "title": "Weightu",
        "artist": "SanGan, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 191,
        "album": "Weightu"
      },
      {
        "id": "song_6",
        "title": "Vaadi Pulla Vaadi",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 247,
        "album": "Vaadi Pulla Vaadi"
      },
      {
        "id": "song_7",
        "title": "Takkunu Takkunu - From \"Mr. Lo...",
        "artist": "Hiphop Tamizha, Anirudh Ravichan...",
        "img": "",
        "audioUrl": "",
        "duration": 213,
        "album": "Takkunu Takkunu (Fro..."
      },
      {
        "id": "song_8",
        "title": "Oru Kuchi Oru Kulfi #TheSelfie...",
        "artist": "Hiphop Tamizha, Gana Vinoth, Sara...",
        "img": "",
        "audioUrl": "",
        "duration": 217,
        "album": "Oru Kuchi Oru Kulfi #..."
      },
      {
        "id": "song_9",
        "title": "Hi Sonna Pothum (From \"Comal...",
        "artist": "Hiphop Tamizha, Kaushik Krish, P...",
        "img": "",
        "audioUrl": "",
        "duration": 230,
        "album": "Hi Sonna Pothum (Fro..."
      },
      {
        "id": "song_10",
        "title": "Iraiva",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Hiphop Tamizhan"
      },
      {
        "id": "song_11",
        "title": "Kadhalikathey",
        "artist": "Hiphop Tamizha, Kaushik Krish",
        "img": "",
        "audioUrl": "",
        "duration": 202,
        "album": "Imaikkaa Nodigal (Or..."
      },
      {
        "id": "song_12",
        "title": "Kalakkalu Mr. Localu",
        "artist": "Hiphop Tamizha, Sivakarthikeyan",
        "img": "",
        "audioUrl": "",
        "duration": 225,
        "album": "Mr. Local (Original Mo..."
      },
      {
        "id": "song_13",
        "title": "Pakkam Vanthu (From \"Kaththi\")",
        "artist": "Anirudh Ravichander, Hiphop Tamiz...",
        "img": "",
        "audioUrl": "",
        "duration": 256,
        "album": "Kaththi (Original Moti..."
      },
      {
        "id": "song_14",
        "title": "Party with the Pei",
        "artist": "Hiphop Tamizha, Kharesma Ravicha...",
        "img": "",
        "audioUrl": "",
        "duration": 215,
        "album": "Aranmanai 2 (Origina..."
      },
      {
        "id": "song_15",
        "title": "Thanga Sela (From \"Anbarivu\")",
        "artist": "Kapil Kapilan, Pradeep Kumar, Hiph...",
        "img": "",
        "audioUrl": "",
        "duration": 279,
        "album": "Thanga Sela (From \"A..."
      },
      {
        "id": "song_16",
        "title": "Chennai City Gangsta",
        "artist": "Anirudh Ravichander, Hard Kaur, Hi...",
        "img": "",
        "audioUrl": "",
        "duration": 258,
        "album": "Vanakkam Chennai (..."
      },
      {
        "id": "song_17",
        "title": "Single Pasanga",
        "artist": "Hiphop Tamizha, Gana Balachanda,...",
        "img": "",
        "audioUrl": "",
        "duration": 224,
        "album": "Natpe Thunai (Origin..."
      },
      {
        "id": "song_18",
        "title": "Karakudi Ilavarasi - From \"Kala...",
        "artist": "Hiphop Tamizha, Jassie Gift, Sudhar...",
        "img": "",
        "audioUrl": "",
        "duration": 279,
        "album": "Karakudi Ilavarasi (Fr..."
      },
      {
        "id": "song_19",
        "title": "Pazhagikalam",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 237,
        "album": "Aambala (Original M..."
      },
      {
        "id": "song_20",
        "title": "Va Va Va Vannila",
        "artist": "Hiphop Tamizha, Mohit Chauhan, A...",
        "img": "",
        "audioUrl": "",
        "duration": 242,
        "album": "Aambala (Original M..."
      },
      {
        "id": "song_21",
        "title": "Tamizhan Da",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 187,
        "album": "Hiphop Tamizhan"
      },
      {
        "id": "song_22",
        "title": "Morattu Single",
        "artist": "Hiphop Tamizha, Sathyaprakash",
        "img": "",
        "audioUrl": "",
        "duration": 187,
        "album": "Natpe Thunai (Origin..."
      },
      {
        "id": "song_23",
        "title": "Kannala Kannala - The Melting ...",
        "artist": "Hiphop Tamizha, Kaushik Krish, Pad...",
        "img": "",
        "audioUrl": "",
        "duration": 215,
        "album": "Thani Oruvan (Origin..."
      },
      {
        "id": "song_24",
        "title": "Kadhal Oru Aagayam",
        "artist": "Hiphop Tamizha, Teejay, Al Rufian",
        "img": "",
        "audioUrl": "",
        "duration": 162,
        "album": "Imaikkaa Nodigal (Or..."
      },
      {
        "id": "song_25",
        "title": "Vilambara Idaiveli - From \"Imai...",
        "artist": "Hiphop Tamizha, Christopher Stanl...",
        "img": "",
        "audioUrl": "",
        "duration": 273,
        "album": "Vilambara Idaiveli (Fr..."
      },
      {
        "id": "song_26",
        "title": "Nee Nenacha",
        "artist": "Hiphop Tamizha, Sid Sriram",
        "img": "",
        "audioUrl": "",
        "duration": 269,
        "album": "Mr. Local (Original Mo..."
      },
      {
        "id": "song_27",
        "title": "Ethir Neechal (From \"Ethir Nee...",
        "artist": "Anirudh Ravichander, Yo Yo Ho...",
        "img": "",
        "audioUrl": "",
        "duration": 271,
        "album": "Bromance: Anirudh R..."
      },
      {
        "id": "song_28",
        "title": "Thani Oruvan - The Power of One",
        "artist": "Hiphop Tamizha, Bobo Shashi",
        "img": "",
        "audioUrl": "",
        "duration": 230,
        "album": "Thani Oruvan (Origin..."
      },
      {
        "id": "song_29",
        "title": "Aye Aye Aye",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 202,
        "album": "Aambala (Original M..."
      },
      {
        "id": "song_30",
        "title": "Madras To Madurai",
        "artist": "Hiphop Tamizha, Kailash Kher, Vish...",
        "img": "",
        "audioUrl": "",
        "duration": 263,
        "album": "Aambala (Original M..."
      },
      {
        "id": "song_31",
        "title": "Yaarenna Sonnalum",
        "artist": "Hiphop Tamizha, Kutle Khan, Antho...",
        "img": "",
        "audioUrl": "",
        "duration": 290,
        "album": "Aambala (Original M..."
      },
      {
        "id": "song_32",
        "title": "Neeyum Naanum Anbe",
        "artist": "Hiphop Tamizha, Raghu Dixit, Sathy...",
        "img": "",
        "audioUrl": "",
        "duration": 285,
        "album": "Imaikkaa Nodigal (Or..."
      },
      {
        "id": "song_33",
        "title": "Machi Engalukku Ellam",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 149,
        "album": "Meesaya Murukku (O..."
      },
      {
        "id": "song_34",
        "title": "Pudichiruka Illa Pudikalaya - Fr...",
        "artist": "Hiphop Tamizha, Varun Parandham...",
        "img": "",
        "audioUrl": "",
        "duration": 237,
        "album": "Pudichiruka Illa Pudik..."
      },
      {
        "id": "song_35",
        "title": "Takkaru Takkaru",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 206,
        "album": "Takkaru Takkaru"
      },
      {
        "id": "song_36",
        "title": "Erangi Vandhu",
        "artist": "Hiphop Tamizha, Anthony Daasan",
        "img": "",
        "audioUrl": "",
        "duration": 214,
        "album": "Kathakali (Original M..."
      },
      {
        "id": "song_37",
        "title": "Kadhale Kadhale",
        "artist": "Hiphop Tamizha, Shankar Mahadev...",
        "img": "",
        "audioUrl": "",
        "duration": 207,
        "album": "Indru Netru Naalai (O..."
      },
      {
        "id": "song_38",
        "title": "Indru Netru Naalai",
        "artist": "Hiphop Tamizha, Shankar Mahadev...",
        "img": "",
        "audioUrl": "",
        "duration": 185,
        "album": "Indru Netru Naalai (O..."
      },
      {
        "id": "song_39",
        "title": "Maatikichu",
        "artist": "V.M. Mahalingam",
        "img": "",
        "audioUrl": "",
        "duration": 198,
        "album": "Meesaya Murukku (O..."
      },
      {
        "id": "song_40",
        "title": "Great Ji - From \"Meesaya Mur...",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 262,
        "album": "Great Ji (From \"Mees..."
      },
      {
        "id": "song_41",
        "title": "Vengamavan",
        "artist": "Hiphop Tamizha, Chinna Ponnu",
        "img": "",
        "audioUrl": "",
        "duration": 218,
        "album": "Natpe Thunai (Origin..."
      },
      {
        "id": "song_42",
        "title": "Net ah Thorandha - From \"Naa ...",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 213,
        "album": "Net ah Thorandha (Fr..."
      },
      {
        "id": "song_43",
        "title": "Pudichiruka Illa Pudikalaya",
        "artist": "Hiphop Tamizha, Kaushik Krish, Pad...",
        "img": "",
        "audioUrl": "",
        "duration": 237,
        "album": "Kalakalappu 2 (Origin..."
      },
      {
        "id": "song_44",
        "title": "Kanavugal",
        "artist": "Benny Dayal, Bamba Bakya, Sridha...",
        "img": "",
        "audioUrl": "",
        "duration": 205,
        "album": "Anbarivu"
      },
      {
        "id": "song_45",
        "title": "Meesaya Murukku",
        "artist": "Hiphop Tamizha, Kharesma Ravicha...",
        "img": "",
        "audioUrl": "",
        "duration": 222,
        "album": "Meesaya Murukku (O..."
      },
      {
        "id": "song_46",
        "title": "Naan Konjam Karuppu Thaan",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 276,
        "album": "Kaththi Sandai (Origi..."
      },
      {
        "id": "song_47",
        "title": "Keka Beka - From \"Naan Sirithal\"",
        "artist": "Rajan Chelliah, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 194,
        "album": "Keka Beka (From \"Na..."
      },
      {
        "id": "song_48",
        "title": "Raja Raja Cholan",
        "artist": "Mc Sai, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 183,
        "album": "Simmasanam the Thr..."
      },
      {
        "id": "song_49",
        "title": "Nadanthavaraikumey",
        "artist": "Hiphop Tamizha, Vozhi",
        "img": "",
        "audioUrl": "",
        "duration": 240,
        "album": "Nadanthavaraikumey"
      },
      {
        "id": "song_50",
        "title": "Tamizhi - From \"Tamizhi\"",
        "artist": "Hiphop Tamizha, Anthony Daasan",
        "img": "",
        "audioUrl": "",
        "duration": 295,
        "album": "Tamizhi (From \"Tamiz..."
      },
      {
        "id": "song_51",
        "title": "Red Cardu (From \"Vantha Rajav...",
        "artist": "Silambarasan TR, Hiphop Tamizha, ...",
        "img": "",
        "audioUrl": "",
        "duration": 209,
        "album": "Red Cardu (From \"Va..."
      },
      {
        "id": "song_52",
        "title": "Enna Nadanthalum",
        "artist": "Hiphop Tamizha, Kaushik Krish",
        "img": "",
        "audioUrl": "",
        "duration": 245,
        "album": "Meesaya Murukku (O..."
      },
      {
        "id": "song_53",
        "title": "Vaadi Ne Va",
        "artist": "Hiphop Tamizha, Rajan Chelliah",
        "img": "",
        "audioUrl": "",
        "duration": 185,
        "album": "Meesaya Murukku (O..."
      },
      {
        "id": "song_54",
        "title": "Neethoney Dance",
        "artist": "Hiphop Tamizha, Nikitha Gandhi",
        "img": "",
        "audioUrl": "",
        "duration": 195,
        "album": "Dhruva"
      },
      {
        "id": "song_55",
        "title": "Breakup Song - From \"Naan Siri...",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 169,
        "album": "Breakup Song (From..."
      },
      {
        "id": "song_56",
        "title": "Endhe Endhe (From \"Agent\")",
        "artist": "Sanjith Hegde, Hiphop Tamizha, Pa...",
        "img": "",
        "audioUrl": "",
        "duration": 216,
        "album": "Endhe Endhe (From \"..."
      },
      {
        "id": "song_57",
        "title": "International",
        "artist": "Hiphop Tamizha, Yung Raja",
        "img": "",
        "audioUrl": "",
        "duration": 197,
        "album": "International"
      },
      {
        "id": "song_58",
        "title": "Malli Malli (From \"Agent\")",
        "artist": "Hiphop Tamizha, Aditya Iyengar",
        "img": "",
        "audioUrl": "",
        "duration": 207,
        "album": "Malli Malli (From \"Age..."
      },
      {
        "id": "song_59",
        "title": "Baby Wassup (1 Min Music)",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 61,
        "album": "Baby Wassup (1 Min ..."
      },
      {
        "id": "song_60",
        "title": "Thiyagi Boys - From \"Coffee Wi...",
        "artist": "Yuvan Shankar Raja, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 206,
        "album": "Thiyagi Boys (From \"..."
      },
      {
        "id": "song_61",
        "title": "IPhone 6 Nee Yendral",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 162,
        "album": "Indru Netru Naalai (O..."
      },
      {
        "id": "song_62",
        "title": "Poraada Poraada",
        "artist": "Hiphop Tamizha, Anthony Daasan",
        "img": "",
        "audioUrl": "",
        "duration": 218,
        "album": "Aranmanai 2 (Origina..."
      },
      {
        "id": "song_63",
        "title": "Kaththi Sandai",
        "artist": "Hiphop Tamizha, Sniggy",
        "img": "",
        "audioUrl": "",
        "duration": 143,
        "album": "Kaththi Sandai (Origi..."
      },
      {
        "id": "song_64",
        "title": "Idhayam Idhayam",
        "artist": "Hiphop Tamizha, Kharesma Ravicha...",
        "img": "",
        "audioUrl": "",
        "duration": 199,
        "album": "Kaththi Sandai (Origi..."
      },
      {
        "id": "song_65",
        "title": "Happy New Year",
        "artist": "Hiphop Tamizha, T. Rajhendherr, Ma...",
        "img": "",
        "audioUrl": "",
        "duration": 261,
        "album": "Happy New Year (Fro..."
      },
      {
        "id": "song_66",
        "title": "Mathurangalam",
        "artist": "Kaber Vasuki",
        "img": "",
        "audioUrl": "",
        "duration": 173,
        "album": "Kavan (Original Moti..."
      },
      {
        "id": "song_67",
        "title": "Kovai Gethu",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 178,
        "album": "Kovai Gethu - Single"
      },
      {
        "id": "song_68",
        "title": "Thaarumaaru - From \"Kalakala...",
        "artist": "Hiphop Tamizha, Sanjith Hegde, Sni...",
        "img": "",
        "audioUrl": "",
        "duration": 204,
        "album": "Thaarumaaru (From \"..."
      },
      {
        "id": "song_69",
        "title": "Vanga Machan Vanga (From \"Va...",
        "artist": "P. Leela, Kaushik Krish, Hiphop Tami...",
        "img": "",
        "audioUrl": "",
        "duration": 182,
        "album": "Vanga Machan Vanga..."
      },
      {
        "id": "song_70",
        "title": "Thunder Kaaran (Promo Song) (...",
        "artist": "Anirudh Ravichander, Hiphop Tamiz...",
        "img": "",
        "audioUrl": "",
        "duration": 157,
        "album": "Thunder Kaaran (Pro..."
      },
      {
        "id": "song_71",
        "title": "Mr.Local (Theme) - From \"Mr. Lo...",
        "artist": "Hiphop Tamizha, Paul B. Sailus, San...",
        "img": "",
        "audioUrl": "",
        "duration": 150,
        "album": "Mr.Local (Theme) [Fro..."
      },
      {
        "id": "song_72",
        "title": "Yaara Comali",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 199,
        "album": "Yaara Comali (From \"..."
      },
      {
        "id": "song_73",
        "title": "Dhom Dhom - From \"Naan Sirit...",
        "artist": "Hiphop Tamizha, Sanjith Hegde",
        "img": "",
        "audioUrl": "",
        "duration": 182,
        "album": "Dhom Dhom (From \"..."
      },
      {
        "id": "song_74",
        "title": "Ajukku Gumukku - From \"Naan ...",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 205,
        "album": "Ajukku Gumukku (Fr..."
      },
      {
        "id": "song_75",
        "title": "Sivakumar Pondati - From \"Siva...",
        "artist": "Hiphop Tamizha, Gana Michael",
        "img": "",
        "audioUrl": "",
        "duration": 196,
        "album": "Sivakumar Pondati (F..."
      },
      {
        "id": "song_76",
        "title": "Eppa Paarthaalum (From \"Aala...",
        "artist": "Hiphop Tamizha, Armaan Malik",
        "img": "",
        "audioUrl": "",
        "duration": 210,
        "album": "Eppa Paarthaalum (Fr..."
      },
      {
        "id": "song_77",
        "title": "Neruppa Irupaan - From \"Sivak...",
        "artist": "Hiphop Tamizha, Padmalatha",
        "img": "",
        "audioUrl": "",
        "duration": 176,
        "album": "Neruppa Irupaan (Fro..."
      },
      {
        "id": "song_78",
        "title": "Middle Class - From \"Sivakuma...",
        "artist": "Hiphop Tamizha, Bamba Bakya",
        "img": "",
        "audioUrl": "",
        "duration": 184,
        "album": "Middle Class (From \"S..."
      },
      {
        "id": "song_79",
        "title": "Arakkiyae (From \"Anbarivu\")",
        "artist": "Yuvan Shankar Raja, Hiphop Tamizh...",
        "img": "",
        "audioUrl": "",
        "duration": 181,
        "album": "Arakkiyae (From \"An..."
      },
      {
        "id": "song_80",
        "title": "Inayam",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 183,
        "album": "Naa Oru Alien"
      },
      {
        "id": "song_81",
        "title": "Pogattum Pogattum Po",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 241,
        "album": "Naa Oru Alien"
      },
      {
        "id": "song_82",
        "title": "Dark Thoughts",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 238,
        "album": "Naa Oru Alien"
      },
      {
        "id": "song_83",
        "title": "Ellamey Konja Kaalam",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Naa Oru Alien"
      },
      {
        "id": "song_84",
        "title": "Yaarumey Venam",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 233,
        "album": "Naa Oru Alien"
      },
      {
        "id": "song_85",
        "title": "Theemai Dhaan Vellum - Awake...",
        "artist": "Hiphop Tamizha, Arvind Swamy",
        "img": "",
        "audioUrl": "",
        "duration": 212,
        "album": "Thani Oruvan (Origin..."
      },
      {
        "id": "song_86",
        "title": "Bahubalikku Oru Kattappa - Fro...",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 202,
        "album": "Bahubalikku Oru Katt..."
      },
      {
        "id": "song_87",
        "title": "Rama Krishna (From \"Agent\")",
        "artist": "Ram Miriyala, Hiphop Tamizha, Cha...",
        "img": "",
        "audioUrl": "",
        "duration": 195,
        "album": "Rama Krishna (From \"..."
      },
      {
        "id": "song_88",
        "title": "Naan Siricha",
        "artist": "Hiphop Tamizha, Kaushik Krish, Ga...",
        "img": "",
        "audioUrl": "",
        "duration": 112,
        "album": "Naan Sirithal (Origina..."
      },
      {
        "id": "song_89",
        "title": "Pallikoodam - The Farewell Son...",
        "artist": "Hiphop Tamizha, Sanjith Hegde",
        "img": "",
        "audioUrl": "",
        "duration": 184,
        "album": "Pallikoodam - The Far..."
      },
      {
        "id": "song_90",
        "title": "Papara Mitta (From \"Veeran\")",
        "artist": "Hiphop Tamizha, vaisagh, Vignesh S...",
        "img": "",
        "audioUrl": "",
        "duration": 180,
        "album": "Papara Mitta (From \"..."
      },
      {
        "id": "song_91",
        "title": "Oxygen",
        "artist": "Hiphop Tamizha, Sudharshan Asho...",
        "img": "",
        "audioUrl": "",
        "duration": 274,
        "album": "Kavan (Original Moti..."
      },
      {
        "id": "song_92",
        "title": "Inbam Pongum Vennila (From \"...",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 207,
        "album": "Inbam Pongum Vennil..."
      },
      {
        "id": "song_93",
        "title": "Senthamizh Penne",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 199,
        "album": "Hiphop Tamizhan"
      },
      {
        "id": "song_94",
        "title": "Veeran Thiruvizha (From \"Veera...",
        "artist": "Muthu Sirpi, Chinna Ponnu, Pranava...",
        "img": "",
        "audioUrl": "",
        "duration": 222,
        "album": "Veeran Thiruvizha (Fr..."
      },
      {
        "id": "song_95",
        "title": "Poi Poi Poi",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 177,
        "album": "Poi Poi Poi"
      },
      {
        "id": "song_96",
        "title": "Chinna Paiyan",
        "artist": "Hiphop Tamizha, vaisagh",
        "img": "",
        "audioUrl": "",
        "duration": 203,
        "album": "Chinna Paiyan"
      },
      {
        "id": "song_97",
        "title": "Ini Illaye Hum",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 182,
        "album": "Hiphop Tamizhan"
      },
      {
        "id": "song_98",
        "title": "Naane Thaan Raja",
        "artist": "Hiphop Tamizha, Anthony Daasan",
        "img": "",
        "audioUrl": "",
        "duration": 215,
        "album": "Indru Netru Naalai (O..."
      },
      {
        "id": "song_99",
        "title": "Imaikkaa Nodiyil - From \"Imaik...",
        "artist": "Hiphop Tamizha, Sanjith Hegde",
        "img": "",
        "audioUrl": "",
        "duration": 226,
        "album": "Imaikkaa Nodiyil (Fro..."
      },
      {
        "id": "song_100",
        "title": "Pakoda Song - From \"Nanban O...",
        "artist": "A H Kaashif, Hiphop Tamizha, Asal K...",
        "img": "",
        "audioUrl": "",
        "duration": 187,
        "album": "Pakoda Song (From \"..."
      },
      {
        "id": "song_101",
        "title": "Maya Maya",
        "artist": "Hiphop Tamizha, Kailash Kher, Pad...",
        "img": "",
        "audioUrl": "",
        "duration": 260,
        "album": "Aranmanai 2 (Origina..."
      },
      {
        "id": "song_102",
        "title": "Kuchi Mittai",
        "artist": "Hiphop Tamizha, Anthony Daasan",
        "img": "",
        "audioUrl": "",
        "duration": 252,
        "album": "Aranmanai 2 (Origina..."
      },
      {
        "id": "song_103",
        "title": "Amma - The Amman Song",
        "artist": "Hiphop Tamizha, Malathi, Anthony ...",
        "img": "",
        "audioUrl": "",
        "duration": 280,
        "album": "Aranmanai 2 (Origina..."
      },
      {
        "id": "song_104",
        "title": "Aathadi",
        "artist": "Hiphop Tamizha, V.M. Mahalingam",
        "img": "",
        "audioUrl": "",
        "duration": 208,
        "album": "Natpe Thunai (Origin..."
      },
      {
        "id": "song_105",
        "title": "Veedhikor Jaadhi - From \"Natp...",
        "artist": "Hiphop Tamizha, Arivu, Sollisai Selv...",
        "img": "",
        "audioUrl": "",
        "duration": 162,
        "album": "Veedhikor Jaadhi (Fr..."
      },
      {
        "id": "song_106",
        "title": "Kerala Song - From \"Natpe Thu...",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 238,
        "album": "Kerala Song (From \"N..."
      },
      {
        "id": "song_107",
        "title": "Oliyum Oliyum (From \"Comali\")",
        "artist": "Hiphop Tamizha, Ajay Krishnaa, Sat...",
        "img": "",
        "audioUrl": "",
        "duration": 285,
        "album": "Oliyum Oliyum (From..."
      },
      {
        "id": "song_108",
        "title": "Achacho - From \"Aranmanai 4\"",
        "artist": "Hiphop Tamizha, Kharesma Ravicha...",
        "img": "",
        "audioUrl": "",
        "duration": 193,
        "album": "Achacho (From \"Aran..."
      },
      {
        "id": "song_109",
        "title": "Uno",
        "artist": "Hiphop Tamizha, Arcus Aryian",
        "img": "",
        "audioUrl": "",
        "duration": 198,
        "album": "UNO"
      },
      {
        "id": "song_110",
        "title": "Monalisa",
        "artist": "Hiphop Tamizha, Slim KD",
        "img": "",
        "audioUrl": "",
        "duration": 186,
        "album": "UNO"
      },
      {
        "id": "song_111",
        "title": "Nambathey",
        "artist": "Hiphop Tamizha, Emzy Shady",
        "img": "",
        "audioUrl": "",
        "duration": 174,
        "album": "UNO"
      },
      {
        "id": "song_112",
        "title": "Falling in Love",
        "artist": "Hiphop Tamizha, MC DEVESH",
        "img": "",
        "audioUrl": "",
        "duration": 217,
        "album": "UNO"
      },
      {
        "id": "song_113",
        "title": "Positive Vibes",
        "artist": "Hiphop Tamizha, Dacalty",
        "img": "",
        "audioUrl": "",
        "duration": 161,
        "album": "UNO"
      },
      {
        "id": "song_114",
        "title": "Siruvani Siruvan",
        "artist": "Hiphop Tamizha, ERA",
        "img": "",
        "audioUrl": "",
        "duration": 212,
        "album": "UNO"
      },
      {
        "id": "song_115",
        "title": "Thillalangadi Lady",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 201,
        "album": "Sivakumarin Sabadh..."
      },
      {
        "id": "song_116",
        "title": "Nesamae - From \"Sivakumarin ...",
        "artist": "Hiphop Tamizha, Anthony Daasan, ...",
        "img": "",
        "audioUrl": "",
        "duration": 200,
        "album": "Nesamae (From \"Siva..."
      },
      {
        "id": "song_117",
        "title": "Andome Kidukidunga (Climax S...",
        "artist": "Senthil Ganesh, Hiphop Tamizha, M...",
        "img": "",
        "audioUrl": "",
        "duration": 174,
        "album": "Veeran (Original Moti..."
      },
      {
        "id": "song_118",
        "title": "Tamil Theriyum",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 190,
        "album": "Hiphop Tamizhan"
      },
      {
        "id": "song_119",
        "title": "Karpom Karpipom",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 272,
        "album": "Hiphop Tamizhan"
      },
      {
        "id": "song_120",
        "title": "Manidhan Tamizhan - Intro",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 251,
        "album": "Hiphop Tamizhan"
      },
      {
        "id": "song_121",
        "title": "Aasai Peraasai - The Greedy G...",
        "artist": "Hiphop Tamizha, Jayam Ravi",
        "img": "",
        "audioUrl": "",
        "duration": 156,
        "album": "Thani Oruvan (Origin..."
      },
      {
        "id": "song_122",
        "title": "Nanba Nanba",
        "artist": "Hiphop Tamizha, Sanjith Hegde",
        "img": "",
        "audioUrl": "",
        "duration": 153,
        "album": "Comali (Original Moti..."
      },
      {
        "id": "song_123",
        "title": "Maula Maula",
        "artist": "Bamba Bakya, Kutle Khan, Nikhita ...",
        "img": "",
        "audioUrl": "",
        "duration": 231,
        "album": "Action"
      },
      {
        "id": "song_124",
        "title": "Opening Song Ithu",
        "artist": "Hiphop Tamizha, Ajay Krishnaa, Ka...",
        "img": "",
        "audioUrl": "",
        "duration": 235,
        "album": "Aalambana (Original ..."
      },
      {
        "id": "song_125",
        "title": "Lights Camera Action",
        "artist": "Kaushik Krish, Rajan Chelliah, Rap (...",
        "img": "",
        "audioUrl": "",
        "duration": 181,
        "album": "Action"
      },
      {
        "id": "song_126",
        "title": "Oorukulla Pudusa",
        "artist": "Hiphop Tamizha, Rising Rapper, Sh...",
        "img": "",
        "audioUrl": "",
        "duration": 184,
        "album": "Aalambana (Original ..."
      },
      {
        "id": "song_127",
        "title": "Aalambana Enga",
        "artist": "Hiphop Tamizha, Kaushik Krish",
        "img": "",
        "audioUrl": "",
        "duration": 76,
        "album": "Aalambana (Original ..."
      },
      {
        "id": "song_128",
        "title": "Boomba Boomba",
        "artist": "Hiphop Tamizha, Kapil Kapilan",
        "img": "",
        "audioUrl": "",
        "duration": 202,
        "album": "Aalambana (Original ..."
      },
      {
        "id": "song_129",
        "title": "Krishna Mukundha",
        "artist": "Hiphop Tamizha, Kaushik Krish, Pad...",
        "img": "",
        "audioUrl": "",
        "duration": 232,
        "album": "Kalakalappu 2 (Origin..."
      },
      {
        "id": "song_130",
        "title": "Nee Sirichalum",
        "artist": "Sadhana Sargam, Jonita Gandhi, Sr...",
        "img": "",
        "audioUrl": "",
        "duration": 278,
        "album": "Action"
      },
      {
        "id": "song_131",
        "title": "Fiyah Fiyah",
        "artist": "Navz-47",
        "img": "",
        "audioUrl": "",
        "duration": 187,
        "album": "Action"
      },
      {
        "id": "song_132",
        "title": "Theeratha Vilayattu Pillai",
        "artist": "Hiphop Tamizha, Anthony Daasan, P...",
        "img": "",
        "audioUrl": "",
        "duration": 309,
        "album": "Kavan (Original Moti..."
      },
      {
        "id": "song_133",
        "title": "Boomerang",
        "artist": "Hiphop Tamizha, Velmurugan, Kaush...",
        "img": "",
        "audioUrl": "",
        "duration": 176,
        "album": "Kavan (Original Moti..."
      },
      {
        "id": "song_134",
        "title": "Oorukaaran",
        "artist": "Hiphop Tamizha, ERA, Chinna Ponnu",
        "img": "",
        "audioUrl": "",
        "duration": 159,
        "album": "Oorukaaran"
      },
      {
        "id": "song_135",
        "title": "Jo Jo - From \"Aranmanai 4\"",
        "artist": "Hiphop Tamizha, Meenakshi Elavar...",
        "img": "",
        "audioUrl": "",
        "duration": 206,
        "album": "Jo Jo (From \"Aranma..."
      },
      {
        "id": "song_136",
        "title": "Oyile Oyile",
        "artist": "Hiphop Tamizha, Kaushik Krish, Sni...",
        "img": "",
        "audioUrl": "",
        "duration": 158,
        "album": "Aranmanai 4 (Origina..."
      },
      {
        "id": "song_137",
        "title": "Amman song",
        "artist": "Hiphop Tamizha, Aruna Ravindran, ...",
        "img": "",
        "audioUrl": "",
        "duration": 282,
        "album": "Aranmanai 4 (Origina..."
      },
      {
        "id": "song_138",
        "title": "Ghost Theme",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 156,
        "album": "Aranmanai 4 (Origina..."
      },
      {
        "id": "song_139",
        "title": "Kutty Pisasey - From \"PT Sir\"",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 170,
        "album": "Kutty Pisasey (From \"..."
      },
      {
        "id": "song_140",
        "title": "Odavum Mudiyadhu Oliyavum ...",
        "artist": "Kaushik Krish, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 200,
        "album": "Odavum Mudiyadhu ..."
      },
      {
        "id": "song_141",
        "title": "Onnuku Renda",
        "artist": "Senthil Ganesh, V.M. Mahalingam, S...",
        "img": "",
        "audioUrl": "",
        "duration": 284,
        "album": "Vantha Rajavathaan ..."
      },
      {
        "id": "song_142",
        "title": "Pattamarangal",
        "artist": "Sanjith Hegde, Rakshita Suresh, Sri...",
        "img": "",
        "audioUrl": "",
        "duration": 196,
        "album": "Vantha Rajavathaan ..."
      },
      {
        "id": "song_143",
        "title": "Modern Muniyamma",
        "artist": "Anthakudi Ilayaraja, Srinisha Jayas...",
        "img": "",
        "audioUrl": "",
        "duration": 197,
        "album": "Vantha Rajavathaan ..."
      },
      {
        "id": "song_144",
        "title": "Paravaigal",
        "artist": "Sanjith Hegde, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 252,
        "album": "Vantha Rajavathaan ..."
      },
      {
        "id": "song_145",
        "title": "Local in International",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 75,
        "album": "Mr. Local (Original Ba..."
      },
      {
        "id": "song_146",
        "title": "Ulaga Azhagiye Neeyaa",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 87,
        "album": "Imaikkaa Nodigal (Or..."
      },
      {
        "id": "song_147",
        "title": "Malayali Penne & Falling for De...",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 85,
        "album": "Natpe Thunai (Origin..."
      },
      {
        "id": "song_148",
        "title": "Happy Birthday - From \"Naan S...",
        "artist": "Diwakar, Gana Balachandar, Hipho...",
        "img": "",
        "audioUrl": "",
        "duration": 187,
        "album": "Happy Birthday (Fro..."
      },
      {
        "id": "song_149",
        "title": "Menaminiki - From \"Mr. Local\"",
        "artist": "Hiphop Tamizha, Benny Dayal, Snig...",
        "img": "",
        "audioUrl": "",
        "duration": 233,
        "album": "Menaminiki (From \"M..."
      },
      {
        "id": "song_150",
        "title": "Madham Madham",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 260,
        "album": "Madham Madham"
      },
      {
        "id": "song_151",
        "title": "Natpu Iruku, Nenja Nimuthu..",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 56,
        "album": "Meesaya Murukku (O..."
      },
      {
        "id": "song_152",
        "title": "Nakkal Pudichavan - From \"PT ...",
        "artist": "Hiphop Tamizha, Rihana, Vignesh Sr...",
        "img": "",
        "audioUrl": "",
        "duration": 217,
        "album": "Nakkal Pudichavan (F..."
      },
      {
        "id": "song_153",
        "title": "Tonta Toin",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 183,
        "album": "PT Sir (Original Motio..."
      },
      {
        "id": "song_154",
        "title": "Kanagavel Kaaka",
        "artist": "Hiphop Tamizha, Kaushik Krish, V M...",
        "img": "",
        "audioUrl": "",
        "duration": 150,
        "album": "PT Sir (Original Motio..."
      },
      {
        "id": "song_155",
        "title": "Poraadu",
        "artist": "Hiphop Tamizha, Kaushik Krish",
        "img": "",
        "audioUrl": "",
        "duration": 205,
        "album": "PT Sir (Original Motio..."
      },
      {
        "id": "song_156",
        "title": "Academic Dropout",
        "artist": "DJ Sambi",
        "img": "",
        "audioUrl": "",
        "duration": 139,
        "album": "Academic Dropout"
      },
      {
        "id": "song_157",
        "title": "Feel Of Buddy - I Just Want to ...",
        "artist": "Hiphop Tamizha, Airaa Udupi, Sai H...",
        "img": "",
        "audioUrl": "",
        "duration": 207,
        "album": "Feel Of Buddy - I Just..."
      },
      {
        "id": "song_158",
        "title": "Bad Boys in the Block Tonite",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 19,
        "album": "Meesaya Murukku (O..."
      },
      {
        "id": "song_159",
        "title": "Hey Do What I Say",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 211,
        "album": "Hiphop Tamizhan"
      },
      {
        "id": "song_160",
        "title": "Stop Piracy - Outro",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 142,
        "album": "Hiphop Tamizhan"
      },
      {
        "id": "song_161",
        "title": "Azhage",
        "artist": "Nakul Abhyankar",
        "img": "",
        "audioUrl": "",
        "duration": 289,
        "album": "Action"
      },
      {
        "id": "song_162",
        "title": "Action Teaser Audio",
        "artist": "NA",
        "img": "",
        "audioUrl": "",
        "duration": 69,
        "album": "Action"
      },
      {
        "id": "song_163",
        "title": "Boombastic - From \"Kadaisi Ula...",
        "artist": "Hiphop Tamizha, Chinna Ponnu, Raj...",
        "img": "",
        "audioUrl": "",
        "duration": 203,
        "album": "Boombastic (From \"K..."
      },
      {
        "id": "song_164",
        "title": "Suthanthira Swasam - From \"K...",
        "artist": "Hiphop Tamizha, Kharesma Ravicha...",
        "img": "",
        "audioUrl": "",
        "duration": 139,
        "album": "Suthanthira Swasam..."
      },
      {
        "id": "song_165",
        "title": "Unakaaga - From \"Kadaisi Ulag...",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 137,
        "album": "Unakaaga (From \"Ka..."
      },
      {
        "id": "song_166",
        "title": "Make Me Go Wild",
        "artist": "Hiphop Tamizha, Rajan Chelliah",
        "img": "",
        "audioUrl": "",
        "duration": 172,
        "album": "Make Me Go Wild"
      },
      {
        "id": "song_167",
        "title": "Ready Steady Go",
        "artist": "Santhosh Narayanan, Chinna Ponn...",
        "img": "",
        "audioUrl": "",
        "duration": 231,
        "album": "Anbarivu"
      },
      {
        "id": "song_168",
        "title": "Kalangathey (From \"Anbarivu\")",
        "artist": "Bamba Bakya, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 145,
        "album": "Kalangathey (From \"..."
      },
      {
        "id": "song_169",
        "title": "Kannirendum (From \"Anbarivu\")",
        "artist": "Saindhavi",
        "img": "",
        "audioUrl": "",
        "duration": 204,
        "album": "World Music Day - Ma..."
      },
      {
        "id": "song_170",
        "title": "Anbae Arivu",
        "artist": "Deva, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 102,
        "album": "Anbarivu"
      },
      {
        "id": "song_171",
        "title": "Arasiyal undertaker",
        "artist": "Hiphop Tamizha, V.M. Mahalingam",
        "img": "",
        "audioUrl": "",
        "duration": 135,
        "album": "Kadaisi Ulaga Por (Ori..."
      },
      {
        "id": "song_172",
        "title": "Adhirgiradha",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 145,
        "album": "Kadaisi Ulaga Por (Ori..."
      },
      {
        "id": "song_173",
        "title": "Keerthana",
        "artist": "Hiphop Tamizha, Rakhooo, Vignesh...",
        "img": "",
        "audioUrl": "",
        "duration": 142,
        "album": "Kadaisi Ulaga Por (Ori..."
      },
      {
        "id": "song_174",
        "title": "I am a Beast",
        "artist": "Hiphop Tamizha, Brodha V",
        "img": "",
        "audioUrl": "",
        "duration": 129,
        "album": "Kadaisi Ulaga Por (Ori..."
      },
      {
        "id": "song_175",
        "title": "Unkitta Solla",
        "artist": "Hiphop Tamizha, Meenakshi Elayar...",
        "img": "",
        "audioUrl": "",
        "duration": 123,
        "album": "Kadaisi Ulaga Por (Ori..."
      },
      {
        "id": "song_176",
        "title": "Indha Yudham",
        "artist": "Hiphop Tamizha, Kutle Khan, Vigne...",
        "img": "",
        "audioUrl": "",
        "duration": 98,
        "album": "Kadaisi Ulaga Por (Ori..."
      },
      {
        "id": "song_177",
        "title": "Karandha Paal",
        "artist": "Hiphop Tamizha, Sivavakkiyar",
        "img": "",
        "audioUrl": "",
        "duration": 111,
        "album": "Kadaisi Ulaga Por (Ori..."
      },
      {
        "id": "song_178",
        "title": "Ettuthikum",
        "artist": "Hiphop Tamizha, Pushpavanam Ku...",
        "img": "",
        "audioUrl": "",
        "duration": 192,
        "album": "Kadaisi Ulaga Por (Ori..."
      },
      {
        "id": "song_179",
        "title": "Take You To Paris",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 235,
        "album": "Take You To Paris"
      },
      {
        "id": "song_180",
        "title": "Naam Vaazhndhidum",
        "artist": "Yuvan Shankar Raja, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 279,
        "album": "Vai Raja Vai (Original ..."
      },
      {
        "id": "song_181",
        "title": "Tamizhi",
        "artist": "Hiphop Tamizha, Anthony Daasan",
        "img": "",
        "audioUrl": "",
        "duration": 295,
        "album": "Tamizhi"
      },
      {
        "id": "song_182",
        "title": "Turn This Party Up",
        "artist": "Hiphop Tamizha, Brodha V",
        "img": "",
        "audioUrl": "",
        "duration": 208,
        "album": "Krishnarjuna Yudham"
      },
      {
        "id": "song_183",
        "title": "Vetri Meethu Vetri Vandhu (Fro...",
        "artist": "S. P. Balasubrahmanyam",
        "img": "",
        "audioUrl": "",
        "duration": 147,
        "album": "Vetri Meethu Vetri Va..."
      },
      {
        "id": "song_184",
        "title": "Aa Pilla Kanule - Buddy's Love (...",
        "artist": "Hiphop Tamizha, Sanjith Hegde, Air...",
        "img": "",
        "audioUrl": "",
        "duration": 164,
        "album": "Aa Pilla Kanule - Budd..."
      },
      {
        "id": "song_185",
        "title": "Silai Pohla",
        "artist": "Mc Sai, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 208,
        "album": "Simmasanam the Thr..."
      },
      {
        "id": "song_186",
        "title": "I Wanna Fly (From \"Krishnarjun...",
        "artist": "L. V. Revanth, Sanjith Hegde, Hipho...",
        "img": "",
        "audioUrl": "",
        "duration": 239,
        "album": "Fly With Ur Nani"
      },
      {
        "id": "song_187",
        "title": "Certified Self Made",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 161,
        "album": "Certified Self Made"
      },
      {
        "id": "song_188",
        "title": "Bye Bye Bhaiya",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 198,
        "album": "Bye Bye Bhaiya"
      },
      {
        "id": "song_189",
        "title": "Land Of Spice",
        "artist": "Kharesma Ravichandran, Hiphop Ta...",
        "img": "",
        "audioUrl": "",
        "duration": 145,
        "album": "Land Of Spice"
      },
      {
        "id": "song_190",
        "title": "Only Fans",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 168,
        "album": "Only Fans"
      },
      {
        "id": "song_191",
        "title": "Nee Illama",
        "artist": "Hiphop Tamizha, Kaushik Krish",
        "img": "",
        "audioUrl": "",
        "duration": 215,
        "album": "Nee Illama"
      },
      {
        "id": "song_192",
        "title": "Clubbula Mabbula",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 214,
        "album": "Hiphop Tamizhan"
      },
      {
        "id": "song_193",
        "title": "Pazhagikalaam",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 237,
        "album": "Aambala (Original M..."
      },
      {
        "id": "song_194",
        "title": "Azhage",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 218,
        "album": "Kathakali - Tamil (Ori..."
      },
      {
        "id": "song_195",
        "title": "Aura 10/10 (From \"Meesaya Mu...",
        "artist": "Hiphop Tamizha, Thamizh Aadhavan",
        "img": "",
        "audioUrl": "",
        "duration": 129,
        "album": "Aura 10/10 (From \"M..."
      },
      {
        "id": "song_196",
        "title": "Pappali Pazhamey (From \"Mees...",
        "artist": "Hiphop Tamizha, Gana Vinoth, Gan...",
        "img": "",
        "audioUrl": "",
        "duration": 206,
        "album": "Pappali Pazhamey (Fr..."
      },
      {
        "id": "song_197",
        "title": "Pareshanura",
        "artist": "Hiphop Tamizha, Padmalatha, Vish...",
        "img": "",
        "audioUrl": "",
        "duration": 193,
        "album": "Dhruva"
      },
      {
        "id": "song_198",
        "title": "If I Can Dream - Live from the '6...",
        "artist": "Elvis Presley",
        "img": "",
        "audioUrl": "",
        "duration": 200,
        "album": "NBC-TV Special (Live)"
      }
    ]
  },
  {
    name: "Sleeping Tablet",
    creator: "Vibeflow Official",
    img: "https://i.pinimg.com/736x/60/f9/27/60f927de319f6c69430fba8082d57f16.jpg",
    createdAt: Date.now(),
    songs: [
      {
        "id": "song_1",
        "title": "Pookkal Pookkum",
        "artist": "G. V. Prakash, Roop Kumar Rathod, Harini, Andrea Jeremiah, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_2",
        "title": "Ayyayo",
        "artist": "G. V. Prakash, S. P. Balasubrahmanyam, S.P. Charan, Prashanthini, Snehan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_3",
        "title": "Manjal Veyil",
        "artist": "Harris Jayaraj, Hariharan, Krishh, Nakkhul",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_4",
        "title": "Adiyae Azhagae - From \"Oru Naal Koothu\"",
        "artist": "Justin Prabhakaran",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_5",
        "title": "Venmegam",
        "artist": "Yuvan Shankar Raja, Hariharan, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_6",
        "title": "Anbae Peranbae",
        "artist": "Yuvan Shankar Raja, Sid Sriram, Shreya Ghoshal, Uma Devi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_7",
        "title": "Thodu Vaanam",
        "artist": "Harris Jayaraj, Hariharan, Shakthisree Gopalan, Vairamuthu",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_8",
        "title": "Engeyo Paartha",
        "artist": "Yuvan Shankar Raja, Udit Narayan, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_9",
        "title": "Usure Pogudhey",
        "artist": "A.R. Rahman, Karthik, Vairamuthu",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_10",
        "title": "Pirai Thedum",
        "artist": "Saindhavi, G. V. Prakash",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_11",
        "title": "Unnaale Unnaale",
        "artist": "Karthik, Krish, Harini",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_12",
        "title": "Mazhai Vara Pogudhae",
        "artist": "Harris Jayaraj, Karthik, Emcee Jesz, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_13",
        "title": "Yaaro Iven",
        "artist": "G. V. Prakash, Saindhavi, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_14",
        "title": "Ondra Renda",
        "artist": "Bombay Jayashri, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_15",
        "title": "Kan Irandil",
        "artist": "Vijay Antony, Naresh Iyer",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_16",
        "title": "Yaayum",
        "artist": "Shabir Sulthan, Naresh Iyer, Rita Thyagarajan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_17",
        "title": "Yedho Ondru Ennai",
        "artist": "Yuvan Shankar Raja, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_18",
        "title": "Un Vizhigalil",
        "artist": "Anirudh Ravichander, Shruti Haasan, R.D. Raja",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_19",
        "title": "Sirukki Vaasam",
        "artist": "Santhosh Narayanan, Anand Aravindakshan, Shweta Mohan, Vivek",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_20",
        "title": "Vizhi Moodi",
        "artist": "Karthik, Prashanthini",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_21",
        "title": "Kadhal Aasai",
        "artist": "Yuvan Shankar Raja, Sooraj Santhosh, Kabilan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_22",
        "title": "Mannipaaya",
        "artist": "A.R. Rahman, Shreya Ghoshal, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_23",
        "title": "Po Indru Neeyaga (From \"Velai Illa Pattadhaari\")",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_24",
        "title": "Yaar Indha Saalai Oram",
        "artist": "G. V. Prakash, Saindhavi, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_25",
        "title": "Velicha Poove",
        "artist": "Anirudh Ravichander, Shreya Ghoshal, Mohit Chauhan, Vaali",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_26",
        "title": "Engeyum Kaadhal",
        "artist": "Harris Jayaraj, Aalaap Raju, Devan Ekambaram, Ranina Reddy",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_27",
        "title": "Oh Oh - The First Love of Tamizh",
        "artist": "Anirudh Ravichander, Dhanush, Nikhita Gandhi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_28",
        "title": "Lolita",
        "artist": "Harris Jayaraj, Karthik, Prashanthini, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_29",
        "title": "Innum Konjam Neram",
        "artist": "A.R. Rahman, Vijay Prakash, Shweta Mohan, Kabilan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_30",
        "title": "Saramal Ponal",
        "artist": "Vivek - Mervin, Mervin Solomon, Sameera Bharadwaj",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_31",
        "title": "Paartha Mudhal",
        "artist": "Harris Jayaraj, Unni Menon, Bombay Jayashri",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_32",
        "title": "Oh Penne",
        "artist": "Anirudh Ravichander, Vishal Dadlani, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_33",
        "title": "Mundhinam",
        "artist": "Harris Jayaraj, Naresh Iyer, Prashanthini, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_34",
        "title": "Kadhale Kadhale",
        "artist": "Hiphop Tamizha, Shankar Mahadevan, Padmalatha",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_35",
        "title": "Neeyum Naanum (From \"Naanum Rowdy Dhaan\")",
        "artist": "Anirudh Ravichander, Thamarai, Neeti Mohan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_36",
        "title": "Imaye Imaye",
        "artist": "G. V. Prakash, Shakthisree Gopalan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_37",
        "title": "Suthudhe Suthudhe",
        "artist": "Yuvan Shankar Raja, Karthik, Sunitha Sarathy, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_38",
        "title": "Oru Naalaikkul",
        "artist": "Yuvan Shankar Raja, Karthik, Rita Thyagarajan, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_39",
        "title": "Annul Maelae",
        "artist": "Harris Jayaraj, Sudha Ragunathan, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_40",
        "title": "Kangal Irandal",
        "artist": "James Vasanthan, Bellie Raj, Deepa Miriam, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_41",
        "title": "Melliname",
        "artist": "Harish Raghavendra",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_42",
        "title": "Oxygen",
        "artist": "Hiphop Tamizha, Kabilan Vairamuthu, Sudharshan Ashok",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_43",
        "title": "Naan Aval Illai",
        "artist": "Yuvan Shankar Raja, Karthik, Chinmayi, Madhan Karky",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_44",
        "title": "Yennai Maatrum Kadhale (From \"Naanum Rowdy Dhaan\")",
        "artist": "Anirudh Ravichander, Vignesh Shivan, Sid Sriram",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_45",
        "title": "Nenjukkule",
        "artist": "A.R. Rahman, Shakthisree Gopalan, Vairamuthu",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_46",
        "title": "Vaarayo Vaarayo",
        "artist": "Harris Jayaraj, Chinmayi, Unnikrishnan, Mega, Kabilan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_47",
        "title": "Uyire Un Uyirena - From \"Zero\"",
        "artist": "Nivas K Prasanna, Anirudh Ravichander",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_48",
        "title": "Akkam Pakkam",
        "artist": "Sadhana Sargam",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_49",
        "title": "Kadhal Sadugudu",
        "artist": "S.P. Charan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_50",
        "title": "Po Nee Po - The Pain of Love",
        "artist": "Anirudh Ravichander, Mohit Chauhan, Dhanush",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_51",
        "title": "Suttum Vizhi",
        "artist": "Sriram Parthasarathy, Bombay Jayashri",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_52",
        "title": "Minnalai Pidithu",
        "artist": "Unni Menon",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_53",
        "title": "Nenje Nenje",
        "artist": "Harish Raghavan, Mahathi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_54",
        "title": "Anbe En Anbe",
        "artist": "Harris Jayaraj, Harish Raghavendra, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_55",
        "title": "Thee Illai",
        "artist": "Harris Jayaraj, Naresh Iyer, Mukesh, Gopal Rao, Mahathi, Ranina Reddy, Vaali",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_56",
        "title": "Neethanae (From \"Mersal\")",
        "artist": "A.R. Rahman, Shreya Ghoshal, Vivek",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_57",
        "title": "En Kadhal Solla",
        "artist": "Yuvan Shankar Raja, Tanvi Shah, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_58",
        "title": "Nenjukkul Peidhidum",
        "artist": "Harris Jayaraj, Hariharan, Devan Ekambaram, VV Prassanna, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_59",
        "title": "Adada Mazhaida",
        "artist": "Yuvan Shankar Raja, Rahul Nambiar, Saindhavi, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_60",
        "title": "Orasaadha - Madras Gig",
        "artist": "Vivek - Mervin, Ku Karthik",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_61",
        "title": "Ennamo Yeadho (From \"KO\")",
        "artist": "Harris Jayaraj, Aalaap Raju, Prashanthini, Emcee Jesz, SriCharan, Madhan Karky",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_62",
        "title": "Asku Laska",
        "artist": "Chinmayi, Vijay Prakash",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_63",
        "title": "Enakenna Yaarum Illaye (From \"Aakko\")",
        "artist": "Anirudh Ravichander, Vignesh Shivan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_64",
        "title": "Kannamma",
        "artist": "Pradeep Kumar, Ananthu, Dhee, Santhosh Narayanan, Uma Devi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_65",
        "title": "Loosu Pennee",
        "artist": "Yuvan Shankar Raja, Silambarasan TR, Blaze",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_66",
        "title": "Aathi",
        "artist": "Anirudh Ravichander, Vishal Dadlani, Yugabharathi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_67",
        "title": "Bodhai Kaname - From \"Oh Manapenne\"",
        "artist": "Vishal Chandrashekhar, Anirudh Ravichander, Shashaa Tirupati",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_68",
        "title": "Yaaro Manathile",
        "artist": "Harris Jayaraj, Bombay Jayashri, Krish",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_69",
        "title": "Thalli Pogathey",
        "artist": "Sid Sriram, Aaryan Dinesh Kanagaratnam, Aparna Narayanan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_70",
        "title": "Azhagho Azhaghu",
        "artist": "Yuvan Shankar Raja, Naresh Iyer",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_71",
        "title": "Enna Nadanthalum",
        "artist": "Hiphop Tamizha, Kaushik Krish",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_72",
        "title": "Chinna Thamarai",
        "artist": "Vijay Antony, Krishh, Suchitra, Viveka",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_73",
        "title": "Kani Mozhiyae",
        "artist": "Harris Jayaraj, Karthik",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_74",
        "title": "Eppa Nee",
        "artist": "G. V. Prakash, Madhusree, Snehan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_75",
        "title": "Mun Andhi",
        "artist": "Harris Jayaraj, Karthik, Megha, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_76",
        "title": "Ava Enna",
        "artist": "Harris Jayaraj, Karthik, VV Prassanna, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_77",
        "title": "Thimiru Kaattaadha Di - From \"LKG\"",
        "artist": "Leon James, Sathyaprakash",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_78",
        "title": "Endha Pakkam",
        "artist": "Radhul Nambiar, Chinmayi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_79",
        "title": "Malachu Maanu",
        "artist": "Vijay Antony, VV Prassanna, Supriya Joshi, Viveka",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_80",
        "title": "Yethi Yethi",
        "artist": "Harris Jayaraj, Benny Dayal, Naresh Iyer, Solar Sai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_81",
        "title": "Un Mele Oru Kannu",
        "artist": "D. Imman, Jithin Raj, Mahalakshmi Iyer, Yugabharathi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_82",
        "title": "En Idhayam",
        "artist": "Devi Sri Prasad, Suchitra, Tippu",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_83",
        "title": "Minnalgal Koothadum - From \"Polladhavan\"",
        "artist": "G. V. Prakash, Na.Muthukumar, Karthik, Bombay Jayashree",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_84",
        "title": "Ae Le Le Etti Paarthale - From \"Naiyaandi\"",
        "artist": "Ghibran, Gold Devaraj, Leon D'souza, Sundar Narayana Rao",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_85",
        "title": "Onnum Puriyala",
        "artist": "D. Imman, Yugabharathi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_86",
        "title": "Vennilave",
        "artist": "Hariharan, Bombay Jayashri",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_87",
        "title": "Yaar Intha",
        "artist": "Haricharan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_88",
        "title": "Veesum Velichathile",
        "artist": "Karthik, G Sahithi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_89",
        "title": "Poongatre Poongatre",
        "artist": "Yuvan Shankar Raja, Benny Dayal, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_90",
        "title": "Venpaniye",
        "artist": "Harris Jayaraj, Sriram Parthasarathy, Bombay Jayashri",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_91",
        "title": "Ammadi Un Azhagu",
        "artist": "D. Imman, Sathyaprakash, Yugabharathi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_92",
        "title": "Munnal Kadhali",
        "artist": "D. Imman, Vishal Dadlani, Sharanya Gopinath, Madhan Karky",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_93",
        "title": "Mental Manadhil",
        "artist": "A.R. Rahman, Jonita Gandhi, Mani Ratnam",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_94",
        "title": "Kadhal Anukkal",
        "artist": "Vijay Prakash, Shreya Ghosal",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_95",
        "title": "Antarctica",
        "artist": "Vijay Prakash, Krish, (Rap) Rajeev",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_96",
        "title": "Neela Vaanam",
        "artist": "Priya Hemesh, Kamal Haasan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_97",
        "title": "Kadavule",
        "artist": "Palaashsen",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_98",
        "title": "Thazhiya",
        "artist": "Harish Raghavendra, Sri Charan, Mega Chorus",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_99",
        "title": "Pachai Nirame",
        "artist": "Hariharan, Clinton Cerejo",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_100",
        "title": "Verasa Pogayile",
        "artist": "D. Imman",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_101",
        "title": "Avalukena",
        "artist": "Anirudh Ravichander, Srinidhi Venkatesh",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_102",
        "title": "Kadhal Yen Kadhal",
        "artist": "Dhanush, Selvaraghavan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_103",
        "title": "Anbae Anbae (From \"Jeans\")",
        "artist": "Hariharan, Anuradha Sriram, Vairamuthu, A.R. Rahman",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_104",
        "title": "Sakkarakatti",
        "artist": "Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_105",
        "title": "Poovukkul (From \"Jeans\")",
        "artist": "Unnikrishnan, Sujatha, Vairamuthu, A.R. Rahman",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_106",
        "title": "Oru Kan Jaadai",
        "artist": "Yuvan Shankar Raja, Benny Dayal, Shweta Pandit",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_107",
        "title": "Thoovaanam",
        "artist": "D. Imman, Vishal Dadlani, Sunitha Sarathy, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_108",
        "title": "Mayam Seidhayo",
        "artist": "Vijay Antony, Sangeetha Rajeshwaran",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_109",
        "title": "Manasellam Mazhaiye",
        "artist": "Sonu Nigam, Saindhavi, G. V. Prakash Kumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_110",
        "title": "Nira - From \"Takkar\"",
        "artist": "Sid Sriram, Gautham Vasudev Menon, Malvi Sundaresan, Nivas K Prasanna",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_111",
        "title": "Yaanji - From \"Vikram Vedha\"",
        "artist": "Sam C.S., Anirudh Ravichander, Shakthisree Gopalan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_112",
        "title": "Va Va Nilava",
        "artist": "Haricharan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_113",
        "title": "Yenna Solla Pore",
        "artist": "Devi Sri Prasad, M.L.R. Karthikeyan, Hari",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_114",
        "title": "Oru Maalai",
        "artist": "Karthik",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_115",
        "title": "Adiyae Kolluthey",
        "artist": "Harris Jayaraj, Krishh, Benny Dayal, Shruti Haasan, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_116",
        "title": "Selfie Pulla",
        "artist": "Anirudh Ravichander, Vijay, Sunidhi Chauhan, Madhan Karky",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_117",
        "title": "Otha Sollala",
        "artist": "G. V. Prakash, Velmurugan, Ekadasi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_118",
        "title": "Pakkam Vanthu",
        "artist": "Anirudh Ravichander, Hiphop Tamizha",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_119",
        "title": "Boomi Enna Suthudhe",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_120",
        "title": "Yellae Lama",
        "artist": "Harris Jayaraj, Vijay Prakash, Karthik, Shruti Haasan, Pop Shalini, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_121",
        "title": "Idhu Varai",
        "artist": "Yuvan Shankar Raja, Ajesh, Andrea Jeremiah, Gangai Amaran",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_122",
        "title": "Yaaro En Nenjai",
        "artist": "Devi Sri Prasad, Sagar, Sumangaly, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_123",
        "title": "Yennachu Yedhachu",
        "artist": "G. V. Prakash, Saindhavi, Kalyani Nair, Kabilan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_124",
        "title": "Voda Voda Voda",
        "artist": "Dhanush",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_125",
        "title": "Pogadhe",
        "artist": "Yuvan Shankar Raja, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_126",
        "title": "Yaar Azhaippadhu",
        "artist": "Ghibran, Sid Sriram",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_127",
        "title": "So Baby (From \"Doctor\")",
        "artist": "Anirudh Ravichander, Ananthakrrishnan, Sivakarthikeyan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_128",
        "title": "Omana Penne",
        "artist": "A.R. Rahman, Benny Dayal, Kalyani Menon, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_129",
        "title": "Nennara",
        "artist": "A.R. Rahman, Shreya Ghoshal, Uday Mazumdar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_130",
        "title": "Anbe Anbe",
        "artist": "G. V. Prakash, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_131",
        "title": "Mei Nigara",
        "artist": "A.R. Rahman, Sid Sriram, Sanah Moidutty, Jonita Gandhi, Madhan Karky",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_132",
        "title": "Moongil Thottam",
        "artist": "A.R. Rahman, Abhay Jodhpurkar, Harini, Vairamuthu",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_133",
        "title": "Thuli Thuli",
        "artist": "Yuvan Shankar Raja, Haricharan, Tanvi Shah, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_134",
        "title": "Pookkalae Sattru Oyivedungal",
        "artist": "A.R. Rahman, Haricharan, Shreya Ghoshal, Madhan Karky",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_135",
        "title": "Nee Paartha Vizhigal X Oru Kili Oru Kili",
        "artist": "Binu Shiva, Vijay Yesudas, Shweta Mohan, Shreya Ghoshal, Satish Chakravarthy",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_136",
        "title": "Enna Solla Pogirai",
        "artist": "Shankar Mahadevan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_137",
        "title": "Kaattrae En Vaasal - Wind",
        "artist": "Unnikrishnan, Kavita Krishnamurthy",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_138",
        "title": "Vaseegara",
        "artist": "Bombay Jayashri",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_139",
        "title": "Snehidhane",
        "artist": "Sadhana Sargam, Srinivas",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_140",
        "title": "Oru Dheivam Thantha Poove - Male",
        "artist": "A.R. Rahman, Vairamuthu, P. Jayachandran, Chinmayi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_141",
        "title": "Alai Payuthey",
        "artist": "Kalyani Menon, Harini, Neyveli Ramalakshmi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_142",
        "title": "Iyengaaru Veetu Azhage",
        "artist": "Harris Jayaraj, Hariharan, Harini",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_143",
        "title": "Pai Sannal (From Run)",
        "artist": "Hariharan, Sadhana Sargam",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_144",
        "title": "Ennai Konjum",
        "artist": "Timmy, Tippu, Pop Shalini, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_145",
        "title": "Ennodu Nee Irundhaal",
        "artist": "A.R. Rahman, Sid Sriram, Sunitha Sarathy, Kabilan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_146",
        "title": "Yaaro Yaaro",
        "artist": "Harris Jayaraj, Karthik, Priya Hemesh, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_147",
        "title": "Ennai Kollathey",
        "artist": "Kumaresh, Keshini",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_148",
        "title": "Indru Netru Naalai",
        "artist": "Hiphop Tamizha, Shankar Mahadevan, Aalaap Raju",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_149",
        "title": "Yaarukkum Sollaama",
        "artist": "Thaman S, Rahul Nambiar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_150",
        "title": "Pattambuchi",
        "artist": "KK, Rita Thyagarajan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_151",
        "title": "Kavakkara Kiliye",
        "artist": "Yuvan Shankar Raja, Tippu, Sujatha",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_152",
        "title": "Oh Baby",
        "artist": "Yuvan Shankar Raja, Naveen, Bhargavi Pillai, Haricharan, Andrea Jeremiah",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_153",
        "title": "Thattu Thattu (From \"Kadhal Kandaen\")",
        "artist": "Harish Raghavendra",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_154",
        "title": "Unnaal Unnaal",
        "artist": "A.R. Rahman, Hariharan, Haricharan, Pooja",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_155",
        "title": "Vaamma Duraiyamma",
        "artist": "G. V. Prakash, Udit Narayan, V.M.C. Haneefa",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_156",
        "title": "En Anbey",
        "artist": "Shankar Mahadevan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_157",
        "title": "Feel My Love",
        "artist": "Devi Sri Prasad, KK",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_158",
        "title": "Un Pera Theriyadhu",
        "artist": "C. Sathya, Madhushree",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_159",
        "title": "Hawa Hawa",
        "artist": "Nivas K Prasanna, Karthik, Saindhavi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_160",
        "title": "Nila Nee Vaanam",
        "artist": "Sabesh Murali, Vijay Yesudas, Chinmayi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_161",
        "title": "Kaattu Sirukki",
        "artist": "A.R. Rahman, Shankar Mahadevan, Anuradha Sriram",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_162",
        "title": "Lesa Parakkudhu",
        "artist": "V. Selvaganesh, Chinmayi, Karthik",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_163",
        "title": "Vizhigalil",
        "artist": "V. Selvaganesh, Karthik, Chinmayi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_164",
        "title": "Pesadhe",
        "artist": "Yuvan Shankar Raja, Harihara Sudhan, Pooja",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_165",
        "title": "Arabu Naadu",
        "artist": "Haricharan, Yuvan Shankar Raja",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_166",
        "title": "Usure",
        "artist": "Siddhu Kumar, Sudharshan Ashok, Jothi Pushpa",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_167",
        "title": "Kaadhal Vaithu",
        "artist": "Vijay Yesudas",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_168",
        "title": "Neeyum Naanum",
        "artist": "Anirudh Ravichander and Neeti Mohan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_169",
        "title": "Oh Sunanda",
        "artist": "G. V. Prakash, Raman Mahadevan, Caroline, Megha, Nivas, Rahul Nambiar, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_170",
        "title": "Mudhal Nee Mudivum Nee Title Track (From \"Mudhal Nee Mudivum Nee\")",
        "artist": "Darbuka Siva, Sid Sriram, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_171",
        "title": "Kannukkul Yedho",
        "artist": "Vijay Yesudas, Rita Thyagarajan",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_172",
        "title": "Chotta Chotta",
        "artist": "C. Sathya, Chinmayi",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_173",
        "title": "Kanmaadithirakkum",
        "artist": "Devi Sri Prasad",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_174",
        "title": "Mayilrage (From \"Anbe Aaruyire\")",
        "artist": "A.R. Rahman, Vaali, Naresh Iyer, Madhusree",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_175",
        "title": "Kaadhal kaditham (From \"Jodi\")",
        "artist": "Unni Menon, S. Janaki, Vairamuthu, A.R. Rahman",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_176",
        "title": "Adada Adada",
        "artist": "Siddharth, Devi Sri Prasad",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_177",
        "title": "Dhimu Dhimu",
        "artist": "Harris Jayaraj, Karthik, Na.Muthukumar",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_178",
        "title": "Oh! Shanthi Shanthi",
        "artist": "Harris Jayaraj, Clinton, S.P. Charan, Thamarai",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_179",
        "title": "Ilamai Thirumbudhe - From \"Petta\"",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_180",
        "title": "Konji Pesida Venaam",
        "artist": "Nivas K Prasanna, K. S. Chithra, Sriram Parthasarathy",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_181",
        "title": "Ambikapathy",
        "artist": "A.R. Rahman, Naresh Iyer, Vairamuthu",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      },
      {
        "id": "song_182",
        "title": "Naani Koni(From \"Maattrraan\")",
        "artist": "Harris Jayaraj, Vijay Prakash, Karthik, Shreya Ghoshal, Shekhinah Shawn Jazeel, Viveka",
        "img": "",
        "audioUrl": "",
        "duration": 0,
        "album": ""
      }
    ]
  },
  {
    name: "Anirudh All Songs",
    creator: "Vibeflow Official",
    img: "https://i.pinimg.com/736x/48/16/7a/48167ae34f17e5f203548ee44c685bbe.jpg",
    createdAt: Date.now(),
    songs: [
      {
        "id": "song_1",
        "title": "Aaja Raja (From \"KH x RK Reunion\")",
        "artist": "Anirudh Ravichander, Chintu",
        "img": "image_url_1.jpg",
        "audioUrl": "audio_url_1.mp3",
        "duration": 200,
        "album": "Aaja Raja (From \"KH x RK Reunion\")"
      },
      {
        "id": "song_2",
        "title": "Raga of Revenge (From \"DC\")",
        "artist": "Anirudh Ravichander",
        "img": "image_url_2.jpg",
        "audioUrl": "audio_url_2.mp3",
        "duration": 180,
        "album": "Raga of Revenge (From \"DC\")"
      },
      {
        "id": "song_3",
        "title": "Enakenna Yaarum Illaye",
        "artist": "Anirudh Ravichander, Vignesh Shivan",
        "img": "image_url_3.jpg",
        "audioUrl": "audio_url_3.mp3",
        "duration": 210,
        "album": "Love Insurance Kompany (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_4",
        "title": "Dheema",
        "artist": "Anirudh Ravichander, Vignesh Shivan",
        "img": "image_url_4.jpg",
        "audioUrl": "audio_url_4.mp3",
        "duration": 195,
        "album": "Love Insurance Kompany (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_5",
        "title": "Aadaavadi",
        "artist": "Anirudh Ravichander, Mathichiyam Bala, Rokesh, Heisenberg, Vignesh Shivan",
        "img": "image_url_5.jpg",
        "audioUrl": "audio_url_5.mp3",
        "duration": 220,
        "album": "Love Insurance Kompany (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_6",
        "title": "Pookettum",
        "artist": "Anirudh Ravichander, Bhumi, Vignesh Shivan",
        "img": "image_url_6.jpg",
        "audioUrl": "audio_url_6.mp3",
        "duration": 205,
        "album": "Love Insurance Kompany (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_7",
        "title": "Arasan Theme (From \"Arasan\")",
        "artist": "Anirudh Ravichander",
        "img": "image_url_7.jpg",
        "audioUrl": "audio_url_7.mp3",
        "duration": 150,
        "album": "Arasan Theme (From \"Arasan\")"
      },
      {
        "id": "song_8",
        "title": "23 Theme (From \"AA23\")",
        "artist": "Anirudh Ravichander, Hector Salamanca, Heisenberg",
        "img": "image_url_8.jpg",
        "audioUrl": "audio_url_8.mp3",
        "duration": 160,
        "album": "23 Theme (From \"AA23\")"
      },
      {
        "id": "song_9",
        "title": "Thalapathy Kacheri (From \"Jana Nayagan\")",
        "artist": "Anirudh Ravichander, Thalapathy Vijay, Arivu",
        "img": "image_url_9.jpg",
        "audioUrl": "audio_url_9.mp3",
        "duration": 230,
        "album": "Thalapathy Kacheri (From \"Jana Nayagan\")"
      },
      {
        "id": "song_10",
        "title": "Oru Pera Varalaaru (From \"Jana Nayagan\")",
        "artist": "Anirudh Ravichander, Vishal Mishra, Vivek",
        "img": "image_url_10.jpg",
        "audioUrl": "audio_url_10.mp3",
        "duration": 215,
        "album": "Oru Pera Varalaaru (From \"Jana Nayagan\")"
      },
      {
        "id": "song_11",
        "title": "Raavana Mavandaa (From \"Jana Nayagan\")",
        "artist": "Anirudh Ravichander, Vivek",
        "img": "image_url_11.jpg",
        "audioUrl": "audio_url_11.mp3",
        "duration": 240,
        "album": "Raavana Mavandaa (From \"Jana Nayagan\")"
      },
      {
        "id": "song_12",
        "title": "Chella Magale (From \"Jana Nayagan\")",
        "artist": "Anirudh Ravichander, Thalapathy Vijay, Vivek",
        "img": "image_url_12.jpg",
        "audioUrl": "audio_url_12.mp3",
        "duration": 200,
        "album": "Chella Magale (From \"Jana Nayagan\")"
      },
      {
        "id": "song_13",
        "title": "Thangapaavey",
        "artist": "Anirudh Ravichander, Ravi G, Vivek",
        "img": "image_url_13.jpg",
        "audioUrl": "audio_url_13.mp3",
        "duration": 225,
        "album": "Madharaasi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_14",
        "title": "Salambala",
        "artist": "Anirudh Ravichander, Sai Abhyankkar, Super Subu",
        "img": "image_url_14.jpg",
        "audioUrl": "audio_url_14.mp3",
        "duration": 210,
        "album": "Madharaasi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_15",
        "title": "Usura Uruvi",
        "artist": "Anirudh Ravichander, Ravi G, Vishnu Edavan",
        "img": "image_url_15.jpg",
        "audioUrl": "audio_url_15.mp3",
        "duration": 255,
        "album": "Madharaasi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_16",
        "title": "Vazhiyiraan",
        "artist": "Anirudh Ravichander, Kwame Fyah, Vignesh Shivan",
        "img": "image_url_16.jpg",
        "audioUrl": "audio_url_16.mp3",
        "duration": 190,
        "album": "Madharaasi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_17",
        "title": "Unadhu Enadhu",
        "artist": "Anirudh Ravichander, Shilpa Rao, Ravi G, Adesh Krishna",
        "img": "image_url_17.jpg",
        "audioUrl": "audio_url_17.mp3",
        "duration": 245,
        "album": "Madharaasi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_18",
        "title": "Madharaasi Flow",
        "artist": "Anirudh Ravichander, Kwame Fyah",
        "img": "image_url_18.jpg",
        "audioUrl": "audio_url_18.mp3",
        "duration": 185,
        "album": "Madharaasi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_19",
        "title": "Powerhouse",
        "artist": "Anirudh Ravichander, Arivu",
        "img": "image_url_19.jpg",
        "audioUrl": "audio_url_19.mp3",
        "duration": 215,
        "album": "Coolie (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_20",
        "title": "Coolie Disco",
        "artist": "Anirudh Ravichander",
        "img": "image_url_20.jpg",
        "audioUrl": "audio_url_20.mp3",
        "duration": 200,
        "album": "Coolie (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_21",
        "title": "Monica",
        "artist": "Anirudh Ravichander, Sublahshini, Asal Kolaar",
        "img": "image_url_21.jpg",
        "audioUrl": "audio_url_21.mp3",
        "duration": 195,
        "album": "Coolie (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_22",
        "title": "Chikitu Vibe Promo (From \"Coolie\")",
        "artist": "Anirudh Ravichander, T. Rajendar",
        "img": "image_url_22.jpg",
        "audioUrl": "audio_url_22.mp3",
        "duration": 175,
        "album": "Chikitu Vibe Promo (From \"Coolie\")"
      },
      {
        "id": "song_23",
        "title": "Kakki",
        "artist": "Anirudh Ravichander, Sooraj Santhosh, Amogh Balaji",
        "img": "image_url_23.jpg",
        "audioUrl": "audio_url_23.mp3",
        "duration": 210,
        "album": "Coolie (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_24",
        "title": "Mabsta",
        "artist": "Anirudh Ravichander, Heisenberg",
        "img": "image_url_24.jpg",
        "audioUrl": "audio_url_24.mp3",
        "duration": 190,
        "album": "Coolie (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_25",
        "title": "I Am The Danger",
        "artist": "Siddharth Basrur, Anirudh Ravichander, Heisenberg",
        "img": "image_url_25.jpg",
        "audioUrl": "audio_url_25.mp3",
        "duration": 225,
        "album": "Coolie (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_26",
        "title": "Thirudi",
        "artist": "Jen Martin, Anirudh Ravichander, Ashique AR",
        "img": "image_url_26.jpg",
        "audioUrl": "audio_url_26.mp3",
        "duration": 210,
        "album": "Kiss (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_27",
        "title": "Idhayam Ulle Vaa",
        "artist": "Anirudh Ravichander, Anumita Nadesan",
        "img": "image_url_27.jpg",
        "audioUrl": "audio_url_27.mp3",
        "duration": 185,
        "album": "Kingdom (Tamil)"
      },
      {
        "id": "song_28",
        "title": "Pathikichu",
        "artist": "Anirudh Ravichander, Yogi Sekar, Amogh Balaji",
        "img": "image_url_28.jpg",
        "audioUrl": "audio_url_28.mp3",
        "duration": 195,
        "album": "Vidaamuyarchi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_29",
        "title": "Perseverance Theme",
        "artist": "Anirudh Ravichander, Amogh Balaji",
        "img": "image_url_29.jpg",
        "audioUrl": "audio_url_29.mp3",
        "duration": 160,
        "album": "Vidaamuyarchi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_30",
        "title": "Thaniye",
        "artist": "Anirudh Ravichander",
        "img": "image_url_30.jpg",
        "audioUrl": "audio_url_30.mp3",
        "duration": 200,
        "album": "Vidaamuyarchi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_31",
        "title": "Sawadeeka",
        "artist": "Anirudh Ravichander, Anthony Daasan, Arivu",
        "img": "image_url_31.jpg",
        "audioUrl": "audio_url_31.mp3",
        "duration": 215,
        "album": "Vidaamuyarchi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_32",
        "title": "Vidaamuyarchi Theme (From \"Vidaamuyarchi\")",
        "artist": "Anirudh Ravichander",
        "img": "image_url_32.jpg",
        "audioUrl": "audio_url_32.mp3",
        "duration": 145,
        "album": "Vidaamuyarchi Theme (From \"Vidaamuyarchi\")"
      },
      {
        "id": "song_33",
        "title": "Hukum Reloaded - Tamil (From \"Jailer 2\")",
        "artist": "Anirudh Ravichander",
        "img": "image_url_33.jpg",
        "audioUrl": "audio_url_33.mp3",
        "duration": 170,
        "album": "Hukum Reloaded - Tamil (From \"Jailer 2\")"
      },
      {
        "id": "song_34",
        "title": "Manasilaayo",
        "artist": "Anirudh Ravichander, Malaysia Vasudevan, Deepthi Suresh, Yugendran Vasudevan",
        "img": "image_url_34.jpg",
        "audioUrl": "audio_url_34.mp3",
        "duration": 240,
        "album": "Vettaiyan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_35",
        "title": "Hunter Vantaar",
        "artist": "Anirudh Ravichander, Siddharth Basrur, Arivu",
        "img": "image_url_35.jpg",
        "audioUrl": "audio_url_35.mp3",
        "duration": 205,
        "album": "Vettaiyan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_36",
        "title": "Vaazh Veesum",
        "artist": "Anirudh Ravichander",
        "img": "image_url_36.jpg",
        "audioUrl": "audio_url_36.mp3",
        "duration": 190,
        "album": "Vettaiyan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_37",
        "title": "Clean Shot",
        "artist": "Anirudh Ravichander, Amogh Balaji, Malaysia Vasudevan",
        "img": "image_url_37.jpg",
        "audioUrl": "audio_url_37.mp3",
        "duration": 225,
        "album": "Vettaiyan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_38",
        "title": "Battery Theme",
        "artist": "Anirudh Ravichander",
        "img": "image_url_38.jpg",
        "audioUrl": "audio_url_38.mp3",
        "duration": 155,
        "album": "Vettaiyan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_39",
        "title": "Uchaathila",
        "artist": "Anirudh Ravichander, Sean Roldan",
        "img": "image_url_39.jpg",
        "audioUrl": "audio_url_39.mp3",
        "duration": 210,
        "album": "Vettaiyan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_40",
        "title": "Hands Up",
        "artist": "Anirudh Ravichander",
        "img": "image_url_40.jpg",
        "audioUrl": "audio_url_40.mp3",
        "duration": 180,
        "album": "Vettaiyan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_41",
        "title": "Fear Song [TAMIL]",
        "artist": "Anirudh Ravichander, Vishnu Edavan",
        "img": "image_url_41.jpg",
        "audioUrl": "audio_url_41.mp3",
        "duration": 195,
        "album": "Devara Part 1 [TAMIL]"
      },
      {
        "id": "song_42",
        "title": "Paththavaikkum",
        "artist": "Deepthi Suresh, Anirudh Ravichander, Vignesh Shivan",
        "img": "image_url_42.jpg",
        "audioUrl": "audio_url_42.mp3",
        "duration": 205,
        "album": "Devara Part 1 [TAMIL]"
      },
      {
        "id": "song_43",
        "title": "Daavudi [TAMIL]",
        "artist": "Nakash Aziz, Ramya Behara, Anirudh Ravichander, Vignesh Shivan",
        "img": "image_url_43.jpg",
        "audioUrl": "audio_url_43.mp3",
        "duration": 220,
        "album": "Devara Part 1 [TAMIL]"
      },
      {
        "id": "song_44",
        "title": "Ayudha Pooja [TAMIL]",
        "artist": "Kala Bhairava, Anirudh Ravichander, Pa. Vijay",
        "img": "image_url_44.jpg",
        "audioUrl": "audio_url_44.mp3",
        "duration": 210,
        "album": "Devara Part 1 [TAMIL]"
      },
      {
        "id": "song_45",
        "title": "God Bless U",
        "artist": "Anirudh Ravichander, Paal Dabba, G. V. Prakash, Rokesh",
        "img": "image_url_45.jpg",
        "audioUrl": "audio_url_45.mp3",
        "duration": 190,
        "album": "Good Bad Ugly [TAMIL]"
      },
      {
        "id": "song_46",
        "title": "Kadharalz",
        "artist": "Anirudh Ravichander",
        "img": "image_url_46.jpg",
        "audioUrl": "audio_url_46.mp3",
        "duration": 200,
        "album": "Indian 2 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_47",
        "title": "Paaraa",
        "artist": "Anirudh Ravichander, Shruthika Samudrala",
        "img": "image_url_47.jpg",
        "audioUrl": "audio_url_47.mp3",
        "duration": 215,
        "album": "Indian 2 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_48",
        "title": "Neelorpam",
        "artist": "Anirudh Ravichander, Abby V, Shruthika Samudrala",
        "img": "image_url_48.jpg",
        "audioUrl": "audio_url_48.mp3",
        "duration": 240,
        "album": "Indian 2 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_49",
        "title": "ZagaZaga",
        "artist": "Anirudh Ravichander",
        "img": "image_url_49.jpg",
        "audioUrl": "audio_url_49.mp3",
        "duration": 185,
        "album": "Indian 2 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_50",
        "title": "Come Back Indian",
        "artist": "Anirudh Ravichander",
        "img": "image_url_50.jpg",
        "audioUrl": "audio_url_50.mp3",
        "duration": 195,
        "album": "Indian 2 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_51",
        "title": "Calendar Song",
        "artist": "Anirudh Ravichander, SUVI, aishwarya suresh",
        "img": "image_url_51.jpg",
        "audioUrl": "audio_url_51.mp3",
        "duration": 220,
        "album": "Indian 2 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_52",
        "title": "Naa Ready",
        "artist": "Anirudh Ravichander, Vijay, Asal Kolaar, Vishnu Edavan",
        "img": "image_url_52.jpg",
        "audioUrl": "audio_url_52.mp3",
        "duration": 230,
        "album": "Leo (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_53",
        "title": "Bloody Sweet",
        "artist": "Anirudh Ravichander, Siddharth Basrur, Heisenberg",
        "img": "image_url_53.jpg",
        "audioUrl": "audio_url_53.mp3",
        "duration": 205,
        "album": "Leo (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_54",
        "title": "Badass",
        "artist": "Anirudh Ravichander, Vishnu Edavan",
        "img": "image_url_54.jpg",
        "audioUrl": "audio_url_54.mp3",
        "duration": 215,
        "album": "Leo (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_55",
        "title": "Anbenum",
        "artist": "Anirudh Ravichander, Lothika",
        "img": "image_url_55.jpg",
        "audioUrl": "audio_url_55.mp3",
        "duration": 245,
        "album": "Leo (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_56",
        "title": "Lokiverse 2.0",
        "artist": "Anirudh Ravichander",
        "img": "image_url_56.jpg",
        "audioUrl": "audio_url_56.mp3",
        "duration": 160,
        "album": "Leo (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_57",
        "title": "Hayyoda",
        "artist": "Anirudh Ravichander, Priya Mali",
        "img": "image_url_57.jpg",
        "audioUrl": "audio_url_57.mp3",
        "duration": 225,
        "album": "Jawan (TAMIL)"
      },
      {
        "id": "song_58",
        "title": "Not Ramaiya Vastavaiya (TAMIL)",
        "artist": "Anirudh Ravichander, Sreerama Chandra, Rakshita Suresh",
        "img": "image_url_58.jpg",
        "audioUrl": "audio_url_58.mp3",
        "duration": 210,
        "album": "Jawan (TAMIL)"
      },
      {
        "id": "song_59",
        "title": "Kaavaalaa",
        "artist": "Anirudh Ravichander, Shilpa Rao, Arunraja Kamaraj",
        "img": "image_url_59.jpg",
        "audioUrl": "audio_url_59.mp3",
        "duration": 200,
        "album": "Jailer (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_60",
        "title": "Hukum - Thalaivar Alappara",
        "artist": "Anirudh Ravichander, Super Subu",
        "img": "image_url_60.jpg",
        "audioUrl": "audio_url_60.mp3",
        "duration": 215,
        "album": "Jailer (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_61",
        "title": "Muthuvel Pandian Theme - Instrumental",
        "artist": "Anirudh Ravichander",
        "img": "image_url_61.jpg",
        "audioUrl": "audio_url_61.mp3",
        "duration": 175,
        "album": "Jailer (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_62",
        "title": "Jailer Theme - Instrumental",
        "artist": "Anirudh Ravichander",
        "img": "image_url_62.jpg",
        "audioUrl": "audio_url_62.mp3",
        "duration": 150,
        "album": "Jailer (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_63",
        "title": "Jujubee",
        "artist": "Anirudh Ravichander, Dhee, Ananthakrrishnan, Super Subu",
        "img": "image_url_63.jpg",
        "audioUrl": "audio_url_63.mp3",
        "duration": 190,
        "album": "Jailer (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_64",
        "title": "Rathamaarey",
        "artist": "Vishal Mishra, Anirudh Ravichander, Vignesh Shivan",
        "img": "image_url_64.jpg",
        "audioUrl": "audio_url_64.mp3",
        "duration": 250,
        "album": "Jailer (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_65",
        "title": "Jailer Drill Theme - Instrumental",
        "artist": "Anirudh Ravichander",
        "img": "image_url_65.jpg",
        "audioUrl": "audio_url_65.mp3",
        "duration": 165,
        "album": "Jailer (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_66",
        "title": "Varman Theme (From \"Jailer\")",
        "artist": "Anirudh Ravichander",
        "img": "image_url_66.jpg",
        "audioUrl": "audio_url_66.mp3",
        "duration": 155,
        "album": "Varman Theme (From \"Jailer\")"
      },
      {
        "id": "song_67",
        "title": "Chilla Chilla - From \"Thunivu\"",
        "artist": "Ghibran, Anirudh Ravichander, vaisagh",
        "img": "image_url_67.jpg",
        "audioUrl": "audio_url_67.mp3",
        "duration": 205,
        "album": "Thunivu (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_68",
        "title": "Scene Ah Scene Ah",
        "artist": "Bharath Sankar, Anirudh Ravichander",
        "img": "image_url_68.jpg",
        "audioUrl": "audio_url_68.mp3",
        "duration": 220,
        "album": "Maaveeran"
      },
      {
        "id": "song_69",
        "title": "Mainaru Vetti Katti",
        "artist": "Santhosh Narayanan, Anirudh Ravichander, Dhee",
        "img": "image_url_69.jpg",
        "audioUrl": "audio_url_69.mp3",
        "duration": 230,
        "album": "Dasara (Tamil)"
      },
      {
        "id": "song_70",
        "title": "Jimikki Ponnu",
        "artist": "Thaman S, Anirudh Ravichander, Jonita Gandhi",
        "img": "image_url_70.jpg",
        "audioUrl": "audio_url_70.mp3",
        "duration": 210,
        "album": "Varisu"
      },
      {
        "id": "song_71",
        "title": "Thaai Kelavi",
        "artist": "Dhanush, Anirudh Ravichander",
        "img": "image_url_71.jpg",
        "audioUrl": "audio_url_71.mp3",
        "duration": 240,
        "album": "Thiruchitrambalam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_72",
        "title": "Megham Karukatha",
        "artist": "Dhanush, Anirudh Ravichander",
        "img": "image_url_72.jpg",
        "audioUrl": "audio_url_72.mp3",
        "duration": 235,
        "album": "Thiruchitrambalam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_73",
        "title": "Life of Pazham",
        "artist": "Anirudh Ravichander, Vivek",
        "img": "image_url_73.jpg",
        "audioUrl": "audio_url_73.mp3",
        "duration": 225,
        "album": "Thiruchitrambalam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_74",
        "title": "Mayakkama Kalakkama",
        "artist": "Dhanush, Anirudh Ravichander",
        "img": "image_url_74.jpg",
        "audioUrl": "audio_url_74.mp3",
        "duration": 250,
        "album": "Thiruchitrambalam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_75",
        "title": "Thenmozhi",
        "artist": "Santhosh Narayanan, Dhanush, Anirudh Ravichander",
        "img": "image_url_75.jpg",
        "audioUrl": "audio_url_75.mp3",
        "duration": 215,
        "album": "Thiruchitrambalam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_76",
        "title": "Pathala Pathala",
        "artist": "Anirudh Ravichander, Kamal Haasan",
        "img": "image_url_76.jpg",
        "audioUrl": "audio_url_76.mp3",
        "duration": 200,
        "album": "Vikram (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_77",
        "title": "Vikram - Title Track",
        "artist": "Anirudh Ravichander, Vishnu Edavan",
        "img": "image_url_77.jpg",
        "audioUrl": "audio_url_77.mp3",
        "duration": 190,
        "album": "Vikram (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_78",
        "title": "Porkanda Singam",
        "artist": "Anirudh Ravichander, Ravi G, Vishnu Edavan",
        "img": "image_url_78.jpg",
        "audioUrl": "audio_url_78.mp3",
        "duration": 240,
        "album": "Vikram (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_79",
        "title": "Once Upon a Time",
        "artist": "Anirudh Ravichander, Heisenberg",
        "img": "image_url_79.jpg",
        "audioUrl": "audio_url_79.mp3",
        "duration": 185,
        "album": "Vikram (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_80",
        "title": "Wasted",
        "artist": "Anirudh Ravichander",
        "img": "image_url_80.jpg",
        "audioUrl": "audio_url_80.mp3",
        "duration": 150,
        "album": "Vikram (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_81",
        "title": "Porkanda Singam EDM Version (Additional Song)",
        "artist": "Anirudh Ravichander, Vishnu Edavan",
        "img": "image_url_81.jpg",
        "audioUrl": "audio_url_81.mp3",
        "duration": 210,
        "album": "Vikram (Original Background Score)"
      },
      {
        "id": "song_82",
        "title": "Amar Theme - Background Score",
        "artist": "Anirudh Ravichander",
        "img": "image_url_82.jpg",
        "audioUrl": "audio_url_82.mp3",
        "duration": 170,
        "album": "Vikram (Original Background Score)"
      },
      {
        "id": "song_83",
        "title": "Sandhanam Theme - Background Score",
        "artist": "Anirudh Ravichander",
        "img": "image_url_83.jpg",
        "audioUrl": "audio_url_83.mp3",
        "duration": 180,
        "album": "Vikram (Original Background Score)"
      },
      {
        "id": "song_84",
        "title": "Rolex Theme - Background Score",
        "artist": "Anirudh Ravichander",
        "img": "image_url_84.jpg",
        "audioUrl": "audio_url_84.mp3",
        "duration": 165,
        "album": "Vikram (Original Background Score)"
      },
      {
        "id": "song_85",
        "title": "Moaning Theme - Background Score",
        "artist": "Anirudh Ravichander",
        "img": "image_url_85.jpg",
        "audioUrl": "audio_url_85.mp3",
        "duration": 140,
        "album": "Vikram (Original Background Score)"
      },
      {
        "id": "song_86",
        "title": "Pablo Sandhanam - Background Score",
        "artist": "Anirudh Ravichander",
        "img": "image_url_86.jpg",
        "audioUrl": "audio_url_86.mp3",
        "duration": 155,
        "album": "Vikram (Original Background Score)"
      },
      {
        "id": "song_87",
        "title": "Lokiverse - Background Score",
        "artist": "Anirudh Ravichander",
        "img": "image_url_87.jpg",
        "audioUrl": "audio_url_87.mp3",
        "duration": 195,
        "album": "Vikram (Original Background Score)"
      },
      {
        "id": "song_88",
        "title": "Cucumba",
        "artist": "Anirudh Ravichander",
        "img": "image_url_88.jpg",
        "audioUrl": "audio_url_88.mp3",
        "duration": 120,
        "album": "Beast (Original Background Score)"
      },
      {
        "id": "song_89",
        "title": "Arabic Kuthu - Halamithi Habibo",
        "artist": "Anirudh Ravichander, Jonita Gandhi",
        "img": "image_url_89.jpg",
        "audioUrl": "audio_url_89.mp3",
        "duration": 220,
        "album": "Beast (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_90",
        "title": "Jolly O Gymkhana",
        "artist": "Thalapathy Vijay, Anirudh Ravichander",
        "img": "image_url_90.jpg",
        "audioUrl": "audio_url_90.mp3",
        "duration": 205,
        "album": "Beast (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_91",
        "title": "Beast Mode",
        "artist": "Anirudh Ravichander",
        "img": "image_url_91.jpg",
        "audioUrl": "audio_url_91.mp3",
        "duration": 185,
        "album": "Beast (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_92",
        "title": "Aaluma Doluma",
        "artist": "Anirudh Ravichander, Badshah, G. Rokesh",
        "img": "image_url_92.jpg",
        "audioUrl": "audio_url_92.mp3",
        "duration": 230,
        "album": "Vedalam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_93",
        "title": "Aathi(From \"Kaththi\")",
        "artist": "Anirudh Ravichander, Vishal Dadlani",
        "img": "image_url_93.jpg",
        "audioUrl": "audio_url_93.mp3",
        "duration": 215,
        "album": "Kaththi(Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_94",
        "title": "Aitha Lakka",
        "artist": "Ganesh Chandrasekaran, Anirudh Ravichander",
        "img": "image_url_94.jpg",
        "audioUrl": "audio_url_94.mp3",
        "duration": 200,
        "album": "Aitha Lakka"
      },
      {
        "id": "song_95",
        "title": "Alladhe Siragiye",
        "artist": "Anirudh Ravichander, Sid Sriram",
        "img": "image_url_95.jpg",
        "audioUrl": "audio_url_95.mp3",
        "duration": 250,
        "album": "Rum (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_96",
        "title": "Amma Amma",
        "artist": "Anirudh Ravichander, Dhanush, S. Janaki",
        "img": "image_url_96.jpg",
        "audioUrl": "audio_url_96.mp3",
        "duration": 245,
        "album": "Velai Illa Pattadhaari(Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_97",
        "title": "Andha Kanna Paathaakaa",
        "artist": "Anirudh Ravichander, Yuvan Shankar Raja, Vignesh Shivan",
        "img": "image_url_97.jpg",
        "audioUrl": "audio_url_97.mp3",
        "duration": 210,
        "album": "Master(Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_98",
        "title": "Avalukena",
        "artist": "Anirudh Ravichander, Srinidhi Venkatesh",
        "img": "image_url_98.jpg",
        "audioUrl": "audio_url_98.mp3",
        "duration": 235,
        "album": "Avalukena"
      },
      {
        "id": "song_99",
        "title": "Bae",
        "artist": "Anirudh Ravichander, Adithya RK, Vignesh Shivan",
        "img": "image_url_99.jpg",
        "audioUrl": "audio_url_99.mp3",
        "duration": 220,
        "album": "Don (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_100",
        "title": "Bagulu Odayum Dagulu Mari - The Return of Maari",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "image_url_100.jpg",
        "audioUrl": "audio_url_100.mp3",
        "duration": 205,
        "album": "Maari(Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_101",
        "title": "Bodhai Kaname",
        "artist": "Vishal Chandrashekhar, Anirudh Ravichander, Shashaa Tirupati",
        "img": "image_url_101.jpg",
        "audioUrl": "audio_url_101.mp3",
        "duration": 240,
        "album": "Oh Manapenne (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_102",
        "title": "Boomi Enna Suthudhe",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "image_url_102.jpg",
        "audioUrl": "audio_url_102.mp3",
        "duration": 215,
        "album": "Ethir Neechal (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_103",
        "title": "Bujji",
        "artist": "Santhosh Narayanan, Anirudh Ravichander, Vivek",
        "img": "image_url_103.jpg",
        "audioUrl": "audio_url_103.mp3",
        "duration": 225,
        "album": "Jagame Thandhiram (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_104",
        "title": "Chellamma",
        "artist": "Anirudh Ravichander, Jonita Gandhi, Sivakarthikeyan",
        "img": "image_url_104.jpg",
        "audioUrl": "audio_url_104.mp3",
        "duration": 200,
        "album": "Doctor (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_105",
        "title": "Come on Girls - The Celebration of Love",
        "artist": "Anirudh Ravichander, Nadisha Thomas, MALIII",
        "img": "image_url_105.jpg",
        "audioUrl": "audio_url_105.mp3",
        "duration": 195,
        "album": "3 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_106",
        "title": "Cute Ponnu",
        "artist": "Anirudh Ravichander, Vivek Siva",
        "img": "image_url_106.jpg",
        "audioUrl": "audio_url_106.mp3",
        "duration": 185,
        "album": "Cute Ponnu (From \"Enna Solla Pogirai\")"
      },
      {
        "id": "song_107",
        "title": "Damaalu Dumeelu",
        "artist": "D. Imman, Anirudh Ravichander",
        "img": "image_url_107.jpg",
        "audioUrl": "audio_url_107.mp3",
        "duration": 210,
        "album": "Bogan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_108",
        "title": "Dandanakka",
        "artist": "D. Imman, Anirudh Ravichander",
        "img": "image_url_108.jpg",
        "audioUrl": "audio_url_108.mp3",
        "duration": 205,
        "album": "Romeo Juliet (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_109",
        "title": "Darling Dambakku",
        "artist": "Anirudh Ravichander, Benny Dayal, Sunidhi Chauhan",
        "img": "image_url_109.jpg",
        "audioUrl": "audio_url_109.mp3",
        "duration": 230,
        "album": "Maan Karate (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_110",
        "title": "Dharala Prabhu Title Track",
        "artist": "Anirudh Ravichander, Vignesh Shivan",
        "img": "image_url_110.jpg",
        "audioUrl": "audio_url_110.mp3",
        "duration": 190,
        "album": "Dharala Prabhu (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_111",
        "title": "Dippam Dappam",
        "artist": "Anirudh Ravichander, Anthony Daasan, Vignesh Shivan",
        "img": "image_url_111.jpg",
        "audioUrl": "audio_url_111.mp3",
        "duration": 215,
        "album": "Kaathuvaakula Rendu Kaadhal (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_112",
        "title": "Don'u Don'u Don'u - The Don's Romance",
        "artist": "Anirudh Ravichander, Alisha Thomas, Dhanush",
        "img": "image_url_112.jpg",
        "audioUrl": "audio_url_112.mp3",
        "duration": 200,
        "album": "Maari (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_113",
        "title": "Edakku Modakku",
        "artist": "Anirudh Ravichander, Sivakarthikeyan",
        "img": "image_url_113.jpg",
        "audioUrl": "audio_url_113.mp3",
        "duration": 195,
        "album": "Naai Sekar (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_114",
        "title": "Enakenna Yaarum Illaye (From \"Aakko\")",
        "artist": "Anirudh Ravichander, Vignesh Shivan",
        "img": "image_url_114.jpg",
        "audioUrl": "audio_url_114.mp3",
        "duration": 225,
        "album": "Enakenna Yaarum Illaye (From \"Aakko\")"
      },
      {
        "id": "song_115",
        "title": "Enna Solla - The New Life of Tamizh",
        "artist": "Anirudh Ravichander, Shweta Mohan, Dhanush",
        "img": "image_url_115.jpg",
        "audioUrl": "audio_url_115.mp3",
        "duration": 240,
        "album": "Thangamagan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_116",
        "title": "Engadi Porandha",
        "artist": "Anirudh Ravichander, Andrea Jeremiah",
        "img": "image_url_116.jpg",
        "audioUrl": "audio_url_116.mp3",
        "duration": 210,
        "album": "Vanakkam Chennai (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_117",
        "title": "Ethir Neechal",
        "artist": "Anirudh Ravichander, Yo Yo Honey Singh, Hiphop Tamizha, Vaali",
        "img": "image_url_117.jpg",
        "audioUrl": "audio_url_117.mp3",
        "duration": 235,
        "album": "Ethir Neechal (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_118",
        "title": "Ey Inge Paaru",
        "artist": "Anirudh Ravichander",
        "img": "image_url_118.jpg",
        "audioUrl": "audio_url_118.mp3",
        "duration": 180,
        "album": "Velai Illa Pattadhaari (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_119",
        "title": "Ezhu Velaikkara",
        "artist": "Anirudh Ravichander, Siddharth Mahadevan",
        "img": "image_url_119.jpg",
        "audioUrl": "audio_url_119.mp3",
        "duration": 205,
        "album": "Velaikkaran (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_120",
        "title": "Gaandakannazhagi",
        "artist": "Anirudh Ravichander and Neeti Mohan",
        "img": "image_url_120.jpg",
        "audioUrl": "audio_url_120.mp3",
        "duration": 220,
        "album": "Namma Veettu Pillai (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_121",
        "title": "Guleba",
        "artist": "Vivek - Mervin, Anirudh Ravichander, Mervin Solomon",
        "img": "image_url_121.jpg",
        "audioUrl": "audio_url_121.mp3",
        "duration": 250,
        "album": "Gulaebaghavali (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_122",
        "title": "Hey Mama",
        "artist": "Nivas K Prasanna, Anirudh Ravichander",
        "img": "image_url_122.jpg",
        "audioUrl": "audio_url_122.mp3",
        "duration": 190,
        "album": "Sethupathi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_123",
        "title": "Idhazhin Oram - The Innocence of Love",
        "artist": "Anirudh Ravichander, Ajesh, Aishwarya R Dhanush",
        "img": "image_url_123.jpg",
        "audioUrl": "audio_url_123.mp3",
        "duration": 245,
        "album": "3 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_124",
        "title": "Ilamai Thirumbudhe - From \"Petta\"",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "image_url_124.jpg",
        "audioUrl": "audio_url_124.mp3",
        "duration": 215,
        "album": "Petta (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_125",
        "title": "Im So Cool",
        "artist": "Anirudh Ravichander, Sivakarthikeyan",
        "img": "image_url_125.jpg",
        "audioUrl": "audio_url_125.mp3",
        "duration": 200,
        "album": "Kaaki Sattai (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_126",
        "title": "I Went a Girl",
        "artist": "Ghibran, Anirudh Ravichander",
        "img": "image_url_126.jpg",
        "audioUrl": "audio_url_126.mp3",
        "duration": 195,
        "album": "Dhanusu Raasi Neyargalae (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_127",
        "title": "Jai Sulthan",
        "artist": "Vivek - Mervin, Anirudh Ravichander, Junior Nithya, Gana Guna",
        "img": "image_url_127.jpg",
        "audioUrl": "audio_url_127.mp3",
        "duration": 230,
        "album": "Sulthan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_128",
        "title": "Jalabulajangu",
        "artist": "Anirudh Ravichander, Rokesh",
        "img": "image_url_128.jpg",
        "audioUrl": "audio_url_128.mp3",
        "duration": 210,
        "album": "Don (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_129",
        "title": "Jigidi Killadi",
        "artist": "Anirudh Ravichander, Vivek - Mervin, Vivek",
        "img": "image_url_129.jpg",
        "audioUrl": "audio_url_129.mp3",
        "duration": 225,
        "album": "Pattas"
      },
      {
        "id": "song_130",
        "title": "Jodi Nilave - The Pain of Tamizh",
        "artist": "Anirudh Ravichander, Dhanush, Shweta Mohan",
        "img": "image_url_130.jpg",
        "audioUrl": "audio_url_130.mp3",
        "duration": 240,
        "album": "Thangamagan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_131",
        "title": "Kadhal Kan Kattudhe",
        "artist": "Anirudh Ravichander, Shakthisree Gopalan",
        "img": "image_url_131.jpg",
        "audioUrl": "audio_url_131.mp3",
        "duration": 215,
        "album": "Kaaki Sattai (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_132",
        "title": "Kadhal Psycho",
        "artist": "Anirudh Ravichander, Dhvani Bhanushali, Tanishk Bagchi",
        "img": "image_url_132.jpg",
        "audioUrl": "audio_url_132.mp3",
        "duration": 190,
        "album": "Saaho"
      },
      {
        "id": "song_133",
        "title": "Kadhalaada",
        "artist": "Anirudh Ravichander, Pradeep Kumar, Shashaa Tirupati",
        "img": "image_url_133.jpg",
        "audioUrl": "audio_url_133.mp3",
        "duration": 235,
        "album": "Vivegam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_134",
        "title": "Kadhalaada - Reprise",
        "artist": "Anirudh Ravichander, Shashaa Tirupati, Narmatha, Pooja",
        "img": "image_url_134.jpg",
        "audioUrl": "audio_url_134.mp3",
        "duration": 205,
        "album": "Vivegam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_135",
        "title": "Kanave Kanave",
        "artist": "Anirudh Ravichander",
        "img": "image_url_135.jpg",
        "audioUrl": "audio_url_135.mp3",
        "duration": 250,
        "album": "David"
      },
      {
        "id": "song_136",
        "title": "Kannaana Kanne",
        "artist": "Sean Roldan",
        "img": "image_url_136.jpg",
        "audioUrl": "audio_url_136.mp3",
        "duration": 260,
        "album": "Naanum Rowdy Dhaan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_137",
        "title": "Kannamma",
        "artist": "Sam C.S., Anirudh Ravichander",
        "img": "image_url_137.jpg",
        "audioUrl": "audio_url_137.mp3",
        "duration": 220,
        "album": "Ispade Rajavum Idhaya Raniyum (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_138",
        "title": "Kannazhaga - The Kiss of Love",
        "artist": "Anirudh Ravichander, Dhanush, Shruti Haasan",
        "img": "image_url_138.jpg",
        "audioUrl": "audio_url_138.mp3",
        "duration": 215,
        "album": "3 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_139",
        "title": "Kanne Kanne",
        "artist": "Anirudh Ravichander, Sam C.S., Vivek",
        "img": "image_url_139.jpg",
        "audioUrl": "audio_url_139.mp3",
        "duration": 195,
        "album": "Ayogya"
      },
      {
        "id": "song_140",
        "title": "Karuthavanlaam Galeejaam",
        "artist": "Anirudh Ravichander, Viveka",
        "img": "image_url_140.jpg",
        "audioUrl": "audio_url_140.mp3",
        "duration": 200,
        "album": "Velaikkaran (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_141",
        "title": "Kaththi Theme... The Sword of Destiny",
        "artist": "Anirudh Ravichander",
        "img": "image_url_141.jpg",
        "audioUrl": "audio_url_141.mp3",
        "duration": 150,
        "album": "Kaththi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_142",
        "title": "Kattikida",
        "artist": "Antony Daasan, Manasi, Anita",
        "img": "image_url_142.jpg",
        "audioUrl": "audio_url_142.mp3",
        "duration": 225,
        "album": "Kaaki Sattai (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_143",
        "title": "Local Boys",
        "artist": "Anirudh Ravichander, Dhanush, Velmurugan, R.S. Durai Senthilkumar",
        "img": "image_url_143.jpg",
        "audioUrl": "audio_url_143.mp3",
        "duration": 210,
        "album": "Ethir Neechal (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_144",
        "title": "Maanja",
        "artist": "Anirudh Ravichander, Madhan Karky",
        "img": "image_url_144.jpg",
        "audioUrl": "audio_url_144.mp3",
        "duration": 205,
        "album": "Maan Karate (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_145",
        "title": "Maari Thara Local - Here Comes Maari",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "image_url_145.jpg",
        "audioUrl": "audio_url_145.mp3",
        "duration": 185,
        "album": "Maari (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_146",
        "title": "Marana Mass - From \"Petta\"",
        "artist": "Anirudh Ravichander, S. P. Balasubrahmanyam, Vivek",
        "img": "image_url_146.jpg",
        "audioUrl": "audio_url_146.mp3",
        "duration": 230,
        "album": "Petta (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_147",
        "title": "Marandhadhae",
        "artist": "Vishal Chandrashekhar, Anirudh Ravichander, Teejay",
        "img": "image_url_147.jpg",
        "audioUrl": "audio_url_147.mp3",
        "duration": 215,
        "album": "Simba (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_148",
        "title": "Mayakirriye",
        "artist": "Anivee, Anirudh Ravichander",
        "img": "image_url_148.jpg",
        "audioUrl": "audio_url_148.mp3",
        "duration": 190,
        "album": "Mayakirriye"
      },
      {
        "id": "song_149",
        "title": "Mersalaayitten",
        "artist": "A.R. Rahman, Anirudh Ravichander, Neeti Mohan, Kabilan",
        "img": "image_url_149.jpg",
        "audioUrl": "audio_url_149.mp3",
        "duration": 240,
        "album": "I (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_150",
        "title": "Naan Pizhai",
        "artist": "Anirudh Ravichander, Ravi G, Shashaa Tirupati, Vignesh Shivan",
        "img": "image_url_150.jpg",
        "audioUrl": "audio_url_150.mp3",
        "duration": 255,
        "album": "Kaathuvaakula Rendu Kaadhal (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_151",
        "title": "Naana Thaana",
        "artist": "Anirudh Ravichander",
        "img": "image_url_151.jpg",
        "audioUrl": "audio_url_151.mp3",
        "duration": 200,
        "album": "Thaanaa Serndha Koottam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_152",
        "title": "Naanum Rowdy Dhaan",
        "artist": "Benny Dayal",
        "img": "image_url_152.jpg",
        "audioUrl": "audio_url_152.mp3",
        "duration": 195,
        "album": "Naanum Rowdy Dhaan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_153",
        "title": "Nanbiye",
        "artist": "D. Imman, Anirudh Ravichander, Madhan Karky",
        "img": "image_url_153.jpg",
        "audioUrl": "audio_url_153.mp3",
        "duration": 220,
        "album": "Teddy (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_154",
        "title": "Nee Paartha Vizhigal - The Touch of Love",
        "artist": "Anirudh Ravichander, Vijay Yesudas, Shweta Mohan, Dhanush",
        "img": "image_url_154.jpg",
        "audioUrl": "audio_url_154.mp3",
        "duration": 235,
        "album": "3 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_155",
        "title": "Nee Yaaro",
        "artist": "K. J. Yesudas",
        "img": "image_url_155.jpg",
        "audioUrl": "audio_url_155.mp3",
        "duration": 210,
        "album": "Kaththi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_156",
        "title": "Neeyum Naanum",
        "artist": "Anirudh Ravichander and Neeti Mohan",
        "img": "image_url_156.jpg",
        "audioUrl": "audio_url_156.mp3",
        "duration": 250,
        "album": "Naanum Rowdy Dhaan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_157",
        "title": "Nenjame",
        "artist": "Anirudh Ravichander",
        "img": "image_url_157.jpg",
        "audioUrl": "audio_url_157.mp3",
        "duration": 180,
        "album": "Doctor (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_158",
        "title": "Nijamellam Maranthupochu",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "image_url_158.jpg",
        "audioUrl": "audio_url_158.mp3",
        "duration": 205,
        "album": "Ethir Neechal (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_159",
        "title": "Oh Oh - The First Love of Tamizh",
        "artist": "Anirudh Ravichander, Dhanush, Nikhita Gandhi",
        "img": "image_url_159.jpg",
        "audioUrl": "audio_url_159.mp3",
        "duration": 225,
        "album": "Thangamagan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_160",
        "title": "Oh Penne",
        "artist": "Anirudh Ravichander, Vishal Dadlani, Na. Muthukumar",
        "img": "image_url_160.jpg",
        "audioUrl": "audio_url_160.mp3",
        "duration": 240,
        "album": "Vanakkam Chennai (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_161",
        "title": "On Nenappu",
        "artist": "Sean Roldan, Anirudh Ravichander",
        "img": "image_url_161.jpg",
        "audioUrl": "audio_url_161.mp3",
        "duration": 195,
        "album": "Kathanayagan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_162",
        "title": "Open the Tasmac",
        "artist": "Anirudh Ravichander, Deva, Gana Bala",
        "img": "image_url_162.jpg",
        "audioUrl": "audio_url_162.mp3",
        "duration": 210,
        "album": "Maan Karate (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_163",
        "title": "Osaka Osaka",
        "artist": "Anirudh Ravichander, Pragathi Guruprasad, Madhan Karky",
        "img": "image_url_163.jpg",
        "audioUrl": "audio_url_163.mp3",
        "duration": 235,
        "album": "Vanakkam Chennai (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_164",
        "title": "Othaiyadi Pathayila",
        "artist": "Dhibu Ninan Thomas, Anirudh Ravichander, Arunraja Kamaraj",
        "img": "image_url_164.jpg",
        "audioUrl": "audio_url_164.mp3",
        "duration": 220,
        "album": "Kanaa (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_165",
        "title": "Pakkam Vanthu (From \"Kaththi\")",
        "artist": "Anirudh Ravichander, Hiphop Tamizha",
        "img": "image_url_165.jpg",
        "audioUrl": "audio_url_165.mp3",
        "duration": 205,
        "album": "Kaththi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_166",
        "title": "Petta Paraak - From \"Petta\"",
        "artist": "Anirudh Ravichander, Vivek",
        "img": "image_url_166.jpg",
        "audioUrl": "audio_url_166.mp3",
        "duration": 185,
        "album": "Petta (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_167",
        "title": "Petta Theme - From \"Petta\"",
        "artist": "Anirudh Ravichander",
        "img": "image_url_167.jpg",
        "audioUrl": "audio_url_167.mp3",
        "duration": 150,
        "album": "Petta (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_168",
        "title": "Po Indru Neeyaga",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "image_url_168.jpg",
        "audioUrl": "audio_url_168.mp3",
        "duration": 215,
        "album": "Velai Illa Pattadhaari (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_169",
        "title": "Po Nee Po - The Pain of Love",
        "artist": "Anirudh Ravichander, Mohit Chauhan, Dhanush",
        "img": "image_url_169.jpg",
        "audioUrl": "audio_url_169.mp3",
        "duration": 245,
        "album": "3 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_170",
        "title": "Po Nee Po - Remix - The Scream of Love",
        "artist": "Anirudh Ravichander, Sathyaprakash, Harish Swaminathan",
        "img": "image_url_170.jpg",
        "audioUrl": "audio_url_170.mp3",
        "duration": 230,
        "album": "3 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_171",
        "title": "Polakattum Para Para",
        "artist": "Anirudh Ravichander, Santhosh Narayanan, Vishnu Edavan",
        "img": "image_url_171.jpg",
        "audioUrl": "audio_url_171.mp3",
        "duration": 210,
        "album": "Master (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_172",
        "title": "Pona Pogattum",
        "artist": "Anirudh Ravichander, CB Vinith",
        "img": "image_url_172.jpg",
        "audioUrl": "audio_url_172.mp3",
        "duration": 195,
        "album": "Master (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_173",
        "title": "Private Party",
        "artist": "Anirudh Ravichander, Jonita Gandhi, Sivakarthikeyan",
        "img": "image_url_173.jpg",
        "audioUrl": "audio_url_173.mp3",
        "duration": 200,
        "album": "Don (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_174",
        "title": "Royapuram Peter",
        "artist": "Anirudh Ravichander, Sivakarthikeyan, Paravai Muniyamma",
        "img": "image_url_174.jpg",
        "audioUrl": "audio_url_174.mp3",
        "duration": 225,
        "album": "Maan Karate (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_175",
        "title": "Sandakari Neethan",
        "artist": "Vivek - Mervin, Anirudh Ravichander, Jonita Gandhi, Mervin Solomon, Prakash Francis",
        "img": "image_url_175.jpg",
        "audioUrl": "audio_url_175.mp3",
        "duration": 240,
        "album": "Sanga Thamizhan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_176",
        "title": "Selfie Pulla (From \"Kaththi\")",
        "artist": "Vijay, Sunidhi Chauhan",
        "img": "image_url_176.jpg",
        "audioUrl": "audio_url_176.mp3",
        "duration": 215,
        "album": "Kaththi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_177",
        "title": "Senjitaley",
        "artist": "Anirudh Ravichander, Vignesh Shivan",
        "img": "image_url_177.jpg",
        "audioUrl": "audio_url_177.mp3",
        "duration": 250,
        "album": "Remo (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_178",
        "title": "Shake That",
        "artist": "Anirudh Ravichander",
        "img": "image_url_178.jpg",
        "audioUrl": "audio_url_178.mp3",
        "duration": 180,
        "album": "Kaaki Sattai (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_179",
        "title": "Shoot the Kuruvi",
        "artist": "Vishal Chandrashekhar, Anirudh Ravichander, Radha Ravi",
        "img": "image_url_179.jpg",
        "audioUrl": "audio_url_179.mp3",
        "duration": 205,
        "album": "Jil Jung Juk (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_180",
        "title": "Sirikkadhey",
        "artist": "Anirudh Ravichander, Arjun Kanungo, Srinidhi Venkatesh, Vignesh Shivan",
        "img": "image_url_180.jpg",
        "audioUrl": "audio_url_180.mp3",
        "duration": 235,
        "album": "Remo (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_181",
        "title": "So Baby",
        "artist": "Anirudh Ravichander, Ananthakrrishnan, Sivakarthikeyan",
        "img": "image_url_181.jpg",
        "audioUrl": "audio_url_181.mp3",
        "duration": 220,
        "album": "Doctor (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_182",
        "title": "Sodakku",
        "artist": "Anirudh Ravichander, Anthony Daasan",
        "img": "image_url_182.jpg",
        "audioUrl": "audio_url_182.mp3",
        "duration": 245,
        "album": "Thaanaa Serndha Koottam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_183",
        "title": "Soul of Doctor (Theme)",
        "artist": "Anirudh Ravichander, Niranjana Ramanan",
        "img": "image_url_183.jpg",
        "audioUrl": "audio_url_183.mp3",
        "duration": 160,
        "album": "Doctor (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_184",
        "title": "Surviva (feat. Yogi B & Mali)",
        "artist": "Anirudh Ravichander, Siva, Yogi B, MALIII",
        "img": "image_url_184.jpg",
        "audioUrl": "audio_url_184.mp3",
        "duration": 210,
        "album": "Vivegam (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_185",
        "title": "Takkunu Takkunu",
        "artist": "Hiphop Tamizha, Anirudh Ravichander",
        "img": "image_url_185.jpg",
        "audioUrl": "audio_url_185.mp3",
        "duration": 195,
        "album": "Mr. Local (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_186",
        "title": "Tamilselvi",
        "artist": "Anirudh Ravichander, Nakash Aziz, Vignesh Shivan",
        "img": "image_url_186.jpg",
        "audioUrl": "audio_url_186.mp3",
        "duration": 225,
        "album": "Remo (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_187",
        "title": "Thangamey",
        "artist": "Anirudh Ravichander",
        "img": "image_url_187.jpg",
        "audioUrl": "audio_url_187.mp3",
        "duration": 215,
        "album": "Naanum Rowdy Dhaan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_188",
        "title": "Theppa Dhaan Theriyum - Maari's Karuthu",
        "artist": "Anirudh Ravichander, Dhanush, Chinna Ponnu, Magizhini Manimaaran",
        "img": "image_url_188.jpg",
        "audioUrl": "audio_url_188.mp3",
        "duration": 200,
        "album": "Maari (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_189",
        "title": "The Maari Swag",
        "artist": "Anirudh Ravichander",
        "img": "image_url_189.jpg",
        "audioUrl": "audio_url_189.mp3",
        "duration": 150,
        "album": "Maari (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_190",
        "title": "Two Two Two",
        "artist": "Anirudh Ravichander, Sunidhi Chauhan, Sanjana Kalmanje, Vignesh Shivan",
        "img": "image_url_190.jpg",
        "audioUrl": "audio_url_190.mp3",
        "duration": 240,
        "album": "Kaathuvaakula Rendu Kaadhal (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_191",
        "title": "Udhungada Sangu",
        "artist": "Anirudh Ravichander",
        "img": "image_url_191.jpg",
        "audioUrl": "audio_url_191.mp3",
        "duration": 190,
        "album": "Velai Illa Pattadhaari (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_192",
        "title": "Ullaallaa - From \"Petta\"",
        "artist": "Anirudh Ravichander, Nakash Aziz, Inno Genga, Vivek",
        "img": "image_url_192.jpg",
        "audioUrl": "audio_url_192.mp3",
        "duration": 230,
        "album": "Petta (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_193",
        "title": "Un Paarvayil",
        "artist": "Anirudh Ravichander, Vivek Siva",
        "img": "image_url_193.jpg",
        "audioUrl": "audio_url_193.mp3",
        "duration": 210,
        "album": "Ethir Neechal (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_194",
        "title": "Un Vizhigalil",
        "artist": "Anirudh Ravichander, Shruti Haasan, R.D. Raja",
        "img": "image_url_194.jpg",
        "audioUrl": "audio_url_194.mp3",
        "duration": 225,
        "album": "Maan Karate (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_195",
        "title": "Uyire Un Uyirena",
        "artist": "Anirudh Ravichander",
        "img": "image_url_195.jpg",
        "audioUrl": "audio_url_195.mp3",
        "duration": 205,
        "album": "Zero (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_196",
        "title": "Vaada Thambi",
        "artist": "G. V. Prakash, Anirudh Ravichander, D. Imman",
        "img": "image_url_196.jpg",
        "audioUrl": "audio_url_196.mp3",
        "duration": 250,
        "album": "Etharkkum Thunindhavan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_197",
        "title": "Vaathi Coming",
        "artist": "Anirudh Ravichander, Gana Balachandar",
        "img": "image_url_197.jpg",
        "audioUrl": "audio_url_197.mp3",
        "duration": 220,
        "album": "Master (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_198",
        "title": "Vaathi Raid",
        "artist": "Anirudh Ravichander, Arivu",
        "img": "image_url_198.jpg",
        "audioUrl": "audio_url_198.mp3",
        "duration": 215,
        "album": "Master (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_199",
        "title": "Varavaa Varavaa",
        "artist": "Anirudh Ravichander, Vignesh Shivan",
        "img": "image_url_199.jpg",
        "audioUrl": "audio_url_199.mp3",
        "duration": 195,
        "album": "Naanum Rowdy Dhaan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_200",
        "title": "Velai Illa Pattadhaari",
        "artist": "Anirudh Ravichander",
        "img": "image_url_200.jpg",
        "audioUrl": "audio_url_200.mp3",
        "duration": 200,
        "album": "Velai Illa Pattadhaari (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_201",
        "title": "Velicha Poove",
        "artist": "Anirudh Ravichander, Shreya Ghoshal, Mohit Chauhan, Vaali",
        "img": "image_url_201.jpg",
        "audioUrl": "audio_url_201.mp3",
        "duration": 240,
        "album": "Ethir Neechal (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_202",
        "title": "What a Karuvaad",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "image_url_202.jpg",
        "audioUrl": "audio_url_202.mp3",
        "duration": 210,
        "album": "Velai Illa Pattadhaari (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_203",
        "title": "Why This Kolaveri Di? - The Soup of Love",
        "artist": "Anirudh Ravichander, Dhanush",
        "img": "image_url_203.jpg",
        "audioUrl": "audio_url_203.mp3",
        "duration": 255,
        "album": "3 (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_204",
        "title": "Yaanji",
        "artist": "Anirudh Ravichander, Sam C.S., Shakthisree Gopalan",
        "img": "image_url_204.jpg",
        "audioUrl": "audio_url_204.mp3",
        "duration": 230,
        "album": "Vikram Vedha (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_205",
        "title": "Yappa Chappa",
        "artist": "Anirudh Ravichander, Kalpana Patowary, Madhan Karky",
        "img": "image_url_205.jpg",
        "audioUrl": "audio_url_205.mp3",
        "duration": 220,
        "album": "Kanithan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_206",
        "title": "Yennai Maatrum Kadhale",
        "artist": "Sid Sriram",
        "img": "image_url_206.jpg",
        "audioUrl": "audio_url_206.mp3",
        "duration": 245,
        "album": "Naanum Rowdy Dhaan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_207",
        "title": "Iraiva",
        "artist": "Anirudh Ravichander, Jonita Gandhi",
        "img": "image_url_207.jpg",
        "audioUrl": "audio_url_207.mp3",
        "duration": 260,
        "album": "Velaikkaran (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_208",
        "title": "Chennai City Gangsta",
        "artist": "Anirudh Ravichander, Hard Kaur, Hiphop Tamizha, Country Chicken",
        "img": "image_url_208.jpg",
        "audioUrl": "audio_url_208.mp3",
        "duration": 215,
        "album": "Vanakkam Chennai (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_209",
        "title": "Mun Sellada",
        "artist": "Santhosh Narayanan, Anirudh Ravichander, ADK, Madhan Karky",
        "img": "image_url_209.jpg",
        "audioUrl": "audio_url_209.mp3",
        "duration": 235,
        "album": "Manithan (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_210",
        "title": "Marakkavillayae (Jersey)",
        "artist": "Anirudh Ravichander",
        "img": "image_url_210.jpg",
        "audioUrl": "audio_url_210.mp3",
        "duration": 210,
        "album": "Marakkavillayae (Jersey) [Original Motion Picture Soundtrack]"
      },
      {
        "id": "song_211",
        "title": "Yela Pullelo",
        "artist": "Anirudh Ravichander, Masala Coffee",
        "img": "image_url_211.jpg",
        "audioUrl": "audio_url_211.mp3",
        "duration": 200,
        "album": "Kannum Kannum Kollaiyadithaal (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_212",
        "title": "Orey Oru",
        "artist": "Jonita Gandhi, Anirudh Ravichander",
        "img": "image_url_212.jpg",
        "audioUrl": "audio_url_212.mp3",
        "duration": 195,
        "album": "Kolamaavu Kokila (CoCo) [Original Motion Picture Soundtrack]"
      },
      {
        "id": "song_213",
        "title": "Kalyana Vayasu",
        "artist": "Abhay Jodhpurkar",
        "img": "image_url_213.jpg",
        "audioUrl": "audio_url_213.mp3",
        "duration": 205,
        "album": "Kolamaavu Kokila (CoCo) [Original Motion Picture Soundtrack]"
      },
      {
        "id": "song_214",
        "title": "Oonjala Oonjala",
        "artist": "Dhibu Ninan Thomas, Sid Sriram, Niranjana Ramanan",
        "img": "image_url_214.jpg",
        "audioUrl": "audio_url_214.mp3",
        "duration": 240,
        "album": "Kanaa (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_215",
        "title": "Thozhaa",
        "artist": "Anirudh Ravichander, Haricharan",
        "img": "image_url_215.jpg",
        "audioUrl": "audio_url_215.mp3",
        "duration": 225,
        "album": "Thozha"
      },
      {
        "id": "song_216",
        "title": "Quit Pannuda",
        "artist": "Anirudh Ravichander",
        "img": "image_url_216.jpg",
        "audioUrl": "audio_url_216.mp3",
        "duration": 185,
        "album": "Master (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_217",
        "title": "Kutti Story",
        "artist": "Anirudh Ravichander, Vijay, Arunraja Kamaraj",
        "img": "image_url_217.jpg",
        "audioUrl": "audio_url_217.mp3",
        "duration": 250,
        "album": "Master (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_218",
        "title": "Bad Eyes... Villain Theme",
        "artist": "Anirudh Ravichander",
        "img": "image_url_218.jpg",
        "audioUrl": "audio_url_218.mp3",
        "duration": 140,
        "album": "Kaththi (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_219",
        "title": "Salambala (Trending Version)",
        "artist": "Anirudh Ravichander, Sai Abhyankkar, Super Subu",
        "img": "image_url_219.jpg",
        "audioUrl": "audio_url_219.mp3",
        "duration": 210,
        "album": "Salambala (Trending Version)"
      }
    ]
  },
  {
    name: "Sai Abhyankkar Vibe",
    creator: "Vibeflow Official",
    img: "https://i.pinimg.com/736x/2e/07/80/2e07806e902e78373c75f679b17fc8d1.jpg",
    createdAt: Date.now(),
    songs: [
      {
        "id": "song_1",
        "title": "Pavazha Malli - From \"Think Indie\"",
        "artist": "Sai Abhyankkar, Shruti Haasan, Vivek",
        "img": "image_url_1.jpg",
        "audioUrl": "audio_url_1.mp3",
        "duration": 215,
        "album": "Pavazha Malli (From \"Think Indie\")"
      },
      {
        "id": "song_2",
        "title": "Oorum Blood - From \"Dude\"",
        "artist": "Sai Abhyankkar, Paal Dabba, Bhumi, Deepthi Suresh",
        "img": "image_url_2.jpg",
        "audioUrl": "audio_url_2.mp3",
        "duration": 205,
        "album": "Oorum Blood (From \"Dude\")"
      },
      {
        "id": "song_3",
        "title": "Singari",
        "artist": "Sai Abhyankkar, Pradeep Ranganathan, Sai Smriti, Semv.iii",
        "img": "image_url_3.jpg",
        "audioUrl": "audio_url_3.mp3",
        "duration": 220,
        "album": "Dude (Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_4",
        "title": "Nallaru Po - From \"Dude\"",
        "artist": "Sai Abhyankkar, Tippu, Mohit Chauhan, Vivek",
        "img": "image_url_4.jpg",
        "audioUrl": "audio_url_4.mp3",
        "duration": 195,
        "album": "Nallaru Po (From \"Dude\")"
      },
      {
        "id": "song_5",
        "title": "Aasa Kooda - From \"Think Indie\"",
        "artist": "Sai Abhyankkar, Sai Smriti",
        "img": "image_url_5.jpg",
        "audioUrl": "audio_url_5.mp3",
        "duration": 230,
        "album": "Aasa Kooda (From \"Think Indie\")"
      },
      {
        "id": "song_6",
        "title": "Katchi Sera - From \"Think Indie\"",
        "artist": "Sai Abhyankkar",
        "img": "image_url_6.jpg",
        "audioUrl": "audio_url_6.mp3",
        "duration": 185,
        "album": "Katchi Sera (From \"Think Indie\")"
      },
      {
        "id": "song_7",
        "title": "Vizhi Veekura - From \"Think Indie\"",
        "artist": "Sai Abhyankkar, Sai Smriti, Adesh Krishna",
        "img": "image_url_7.jpg",
        "audioUrl": "audio_url_7.mp3",
        "duration": 210,
        "album": "Vizhi Veekura (From \"Think Indie\")"
      },
      {
        "id": "song_8",
        "title": "Sithira Puthiri - From \"Think Indie\"",
        "artist": "Sai Abhyankkar, Vivek",
        "img": "image_url_8.jpg",
        "audioUrl": "audio_url_8.mp3",
        "duration": 200,
        "album": "Sithira Puthiri(From \"Think Indie\")"
      },
      {
        "id": "song_9",
        "title": "Make Way For The King (From \"Raaka\")",
        "artist": "Sai Abhyankkar, Dhp",
        "img": "image_url_9.jpg",
        "audioUrl": "audio_url_9.mp3",
        "duration": 175,
        "album": "Make Way For The King (From \"Raaka\")"
      },
      {
        "id": "song_10",
        "title": "Jaalakaari - From \"Balti\"",
        "artist": "Sai Abhyankkar, Sublahshini, Vinayak Sasikumar",
        "img": "image_url_10.jpg",
        "audioUrl": "audio_url_10.mp3",
        "duration": 225,
        "album": "Jaalakaari (From \"Balti\")"
      },
      {
        "id": "song_11",
        "title": "Adi Alaye (From \"Parasakkthi\") (Tamil)",
        "artist": "G. V. Prakash, Sean Roldan, Dhee, Ekadesi",
        "img": "image_url_11.jpg",
        "audioUrl": "audio_url_11.mp3",
        "duration": 240,
        "album": "Adi Alaye (From \"Parasakkthi\") (Tamil)"
      },
      {
        "id": "song_12",
        "title": "Espresso",
        "artist": "Sabrina Carpenter",
        "img": "image_url_12.jpg",
        "audioUrl": "audio_url_12.mp3",
        "duration": 175,
        "album": "Espresso"
      },
      {
        "id": "song_13",
        "title": "Soda Break - From \"Balti\"",
        "artist": "Sai Abhyankkar",
        "img": "image_url_13.jpg",
        "audioUrl": "audio_url_13.mp3",
        "duration": 190,
        "album": "Soda Break (From \"Balti\")"
      },
      {
        "id": "song_14",
        "title": "Thangapaavey",
        "artist": "Anirudh Ravichander, Ravi G, Vivek",
        "img": "image_url_14.jpg",
        "audioUrl": "audio_url_14.mp3",
        "duration": 235,
        "album": "Madharaasi(Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_15",
        "title": "Karaya Karaya (From \"Heartin\")",
        "artist": "Rajesh Murugesan, Vivek, Shakthisree Gopalan, Benny Dayal",
        "img": "image_url_15.jpg",
        "audioUrl": "audio_url_15.mp3",
        "duration": 210,
        "album": "Karaya Karaya (From \"Heartin\")"
      },
      {
        "id": "song_16",
        "title": "Salambala",
        "artist": "Anirudh Ravichander, Sai Abhyankkar, Super Subu",
        "img": "image_url_16.jpg",
        "audioUrl": "audio_url_16.mp3",
        "duration": 220,
        "album": "Madharaasi(Original Motion Picture Soundtrack)"
      },
      {
        "id": "song_17",
        "title": "Finding Her",
        "artist": "Kushagra, Bharath, Saaheal",
        "img": "image_url_17.jpg",
        "audioUrl": "audio_url_17.mp3",
        "duration": 185,
        "album": "Finding Her"
      },
      {
        "id": "song_18",
        "title": "Ishq",
        "artist": "Faheem Abdullah, Rauhan Malik, Amir Ameer",
        "img": "image_url_18.jpg",
        "audioUrl": "audio_url_18.mp3",
        "duration": 245,
        "album": "Lost;Found"
      },
      {
        "id": "song_19",
        "title": "Kitni Haseen",
        "artist": "AKASH MEHTA",
        "img": "image_url_19.jpg",
        "audioUrl": "audio_url_19.mp3",
        "duration": 215,
        "album": "Kitni Haseen"
      },
      {
        "id": "song_20",
        "title": "Harleys In Hawaii",
        "artist": "Katy Perry",
        "img": "image_url_20.jpg",
        "audioUrl": "audio_url_20.mp3",
        "duration": 185,
        "album": "Harleys In Hawaii"
      },
      {
        "id": "song_21",
        "title": "Benz In The Universe Theme - From \"Benz\"",
        "artist": "Sai Abhyankkar",
        "img": "image_url_21.jpg",
        "audioUrl": "audio_url_21.mp3",
        "duration": 160,
        "album": "Benz In The Universe Theme (From \"Benz\")"
      }
    ]
  }
];

async function seedCustomPlaylists() {
  try {
    console.log("Seeding custom playlists to Firebase...");
    for (const playlist of customPlaylists) {
      // Skip uploading if you haven't added songs yet and only want non-empty playlists uploaded
      if (playlist.songs.length === 0) {
        console.log(`Skipping ${playlist.name} (no songs added)`);
        continue;
      }
      // Delete existing playlists with the same name to prevent duplicates
      const q = query(collection(db, "playlists"), where("name", "==", playlist.name));
      const querySnapshot = await getDocs(q);
      for (const doc of querySnapshot.docs) {
        await deleteDoc(doc.ref);
        console.log(`Deleted existing playlist: ${playlist.name} (${doc.id})`);
      }

      playlist.hidden = true;
      await addDoc(collection(db, "playlists"), playlist);
      console.log(`Successfully added playlist: ${playlist.name}`);
    }
    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Error adding custom playlists:", err);
    process.exit(1);
  }
}

seedCustomPlaylists();
