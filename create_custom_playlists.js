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
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop",
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
    name: "Romantic Melodies",
    creator: "Vibeflow Official",
    img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    songs: []
  },
  {
    name: "Midnight Drives",
    creator: "Vibeflow Official",
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    songs: []
  },
  {
    name: "Party Anthems",
    creator: "Vibeflow Official",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    songs: []
  },
  {
    name: "Focus & Chill",
    creator: "Vibeflow Official",
    img: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    songs: []
  },
  {
    name: "S.P.B Melodies",
    creator: "Vibeflow Official",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=200&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=200&auto=format&fit=crop",
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
