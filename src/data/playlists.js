// Tamil Music Playlists - curated by astraardency
// Active user playlists are stored dynamically in Firebase Firestore.

export const defaultPlaylists = [
  {
    id: "pl_1",
    name: "Tamil Hits 2024",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_1", title: "Chillax", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Chillax.jpg" },
      { id: "s_2", title: "Kaththi", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Kaththi.jpg" },
      { id: "s_3", title: "Enantha Enantha", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Enantha Enantha.jpg" },
      { id: "s_4", title: "Rowdy Baby", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Rowdy Baby.jpg" },
      { id: "s_5", title: "Kannaana Kanney", artist: "D. Imman", img: "images/D. Imman/Kannaana Kanney.jpg" }
    ]
  },
  {
    id: "pl_2",
    name: "A.R. Rahman Classics",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_6", title: "Roja Jaaneman", artist: "A.R. Rahman", img: "images/A.R. Rahman/Roja Jaaneman.jpg" },
      { id: "s_7", title: "Mustafa Mustafa", artist: "A.R. Rahman", img: "images/A.R. Rahman/Mustafa Mustafa.jpg" },
      { id: "s_8", title: "Urvasi Urvasi", artist: "A.R. Rahman", img: "images/A.R. Rahman/Urvasi Urvasi.jpg" },
      { id: "s_9", title: "Kehna Hi Kya", artist: "A.R. Rahman", img: "images/A.R. Rahman/Kehna Hi Kya.jpg" },
      { id: "s_10", title: "Chinna Chinna Aasai", artist: "A.R. Rahman", img: "images/A.R. Rahman/Chinna Chinna Aasai.jpg" },
      { id: "s_11", title: "Dil Se Re", artist: "A.R. Rahman", img: "images/A.R. Rahman/Dil Se Re.jpg" }
    ]
  },
  {
    id: "pl_3",
    name: "Anirudh Bangers",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_12", title: "Why This Kolaveri Di", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Why This Kolaveri Di.jpg" },
      { id: "s_13", title: "Aaluma Doluma", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Aaluma Doluma.jpg" },
      { id: "s_14", title: "Verithanam", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Verithanam.jpg" },
      { id: "s_15", title: "Naana Thadanaa", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Naana Thadanaa.jpg" },
      { id: "s_16", title: "Maari Thara Local", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Maari Thara Local.jpg" },
      { id: "s_17", title: "Kannazhaga", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Kannazhaga.jpg" }
    ]
  },
  {
    id: "pl_4",
    name: "Yuvan Love Songs",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_18", title: "Nenjukkul Peidhidum", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Nenjukkul Peidhidum.jpg" },
      { id: "s_19", title: "Oru Murai Vanthu Paarthaya", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Oru Murai Vanthu Paarthaya.jpg" },
      { id: "s_20", title: "Munbe Vaa", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Munbe Vaa.jpg" },
      { id: "s_21", title: "Inaindha Kaigal", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Inaindha Kaigal.jpg" },
      { id: "s_22", title: "Thalli Pogathey", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Thalli Pogathey.jpg" }
    ]
  },
  {
    id: "pl_5",
    name: "90s Tamil Nostalgic",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1598387993441-a364f854cfba?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_23", title: "Poove Unakkaga", artist: "A.R. Rahman", img: "images/A.R. Rahman/Poove Unakkaga.jpg" },
      { id: "s_24", title: "Kadhal Rojave", artist: "A.R. Rahman", img: "images/A.R. Rahman/Kadhal Rojave.jpg" },
      { id: "s_25", title: "En Iniya Pon Nilave", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/En Iniya Pon Nilave.jpg" },
      { id: "s_26", title: "Ninaithale Inikkum", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Ninaithale Inikkum.jpg" },
      { id: "s_27", title: "Roja Kaadhal", artist: "A.R. Rahman", img: "images/A.R. Rahman/Roja Kaadhal.jpg" },
      { id: "s_28", title: "Urvasi Urvasi", artist: "A.R. Rahman", img: "images/A.R. Rahman/Urvasi Urvasi.jpg" }
    ]
  },
  {
    id: "pl_6",
    name: "Ilaiyaraaja Forever",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_29", title: "Poovarasam Peepee", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Poovarasam Peepee.jpg" },
      { id: "s_30", title: "Naan Paadum Mouna Raagam", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Naan Paadum Mouna Raagam.jpg" },
      { id: "s_31", title: "Endrendrum Punnagai", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Endrendrum Punnagai.jpg" },
      { id: "s_32", title: "Unakkena Vaazhjiren", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Unakkena Vaazhjiren.jpg" },
      { id: "s_33", title: "Aasai Aasaiyai", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Aasai Aasaiyai.jpg" },
      { id: "s_34", title: "Ninaithale Inikkum", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Ninaithale Inikkum.jpg" }
    ]
  },
  {
    id: "pl_7",
    name: "Rajinikanth Mass Hits",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_35", title: "Verithanam", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Verithanam.jpg" },
      { id: "s_36", title: "Kabali Para", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Kabali Para.jpg" },
      { id: "s_37", title: "Neruppu Da", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Neruppu Da.jpg" },
      { id: "s_38", title: "Kaala Kaala", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Kaala Kaala.jpg" },
      { id: "s_39", title: "Style", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Style.jpg" }
    ]
  },
  {
    id: "pl_8",
    name: "D. Imman Melodies",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_40", title: "Kannaana Kanney", artist: "D. Imman", img: "images/D. Imman/Kannaana Kanney.jpg" },
      { id: "s_41", title: "Aayiram Jenmangal", artist: "D. Imman", img: "images/D. Imman/Aayiram Jenmangal.jpg" },
      { id: "s_42", title: "Nee Partha Vizhigal", artist: "D. Imman", img: "images/D. Imman/Nee Partha Vizhigal.jpg" },
      { id: "s_43", title: "Uyire Uyire", artist: "D. Imman", img: "images/D. Imman/Uyire Uyire.jpg" },
      { id: "s_44", title: "Thanga Magan", artist: "D. Imman", img: "images/D. Imman/Thanga Magan.jpg" },
      { id: "s_45", title: "Aalaporan Thamizhan", artist: "D. Imman", img: "images/D. Imman/Aalaporan Thamizhan.jpg" }
    ]
  },
  {
    id: "pl_9",
    name: "Santhosh Narayanan Vibes",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_46", title: "Inji Iduppazhagi", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Inji Iduppazhagi.jpg" },
      { id: "s_47", title: "Mental Manadhil", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Mental Manadhil.jpg" },
      { id: "s_48", title: "Rekka Vecha Paravaiyada", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Rekka Vecha Paravaiyada.jpg" },
      { id: "s_49", title: "Aayirathil Oruvan", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Aayirathil Oruvan.jpg" },
      { id: "s_50", title: "Enjoy Enjaami", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Enjoy Enjaami.jpg" }
    ]
  },
  {
    id: "pl_10",
    name: "Tamil Peppy Dance Hits",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_51", title: "Rowdy Baby", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Rowdy Baby.jpg" },
      { id: "s_52", title: "Aaluma Doluma", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Aaluma Doluma.jpg" },
      { id: "s_53", title: "Kutti Story", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Kutti Story.jpg" },
      { id: "s_54", title: "Vaathi Coming", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Vaathi Coming.jpg" },
      { id: "s_55", title: "Chellamma", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Chellamma.jpg" },
      { id: "s_56", title: "Inji Iduppazhagi", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Inji Iduppazhagi.jpg" }
    ]
  },
  {
    id: "pl_11",
    name: "Vijay Movie Anthems",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_57", title: "Vaathi Coming", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Vaathi Coming.jpg" },
      { id: "s_58", title: "Beast Mode", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Beast Mode.jpg" },
      { id: "s_59", title: "Selfie Pulla", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Selfie Pulla.jpg" },
      { id: "s_60", title: "Naana Thadanaa", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Naana Thadanaa.jpg" },
      { id: "s_61", title: "Aalaporan Thamizhan", artist: "D. Imman", img: "images/D. Imman/Aalaporan Thamizhan.jpg" }
    ]
  },
  {
    id: "pl_12",
    name: "Soulful Tamil Melodies",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_62", title: "Vinnaithaandi Varuvaayaa", artist: "A.R. Rahman", img: "images/A.R. Rahman/Vinnaithaandi Varuvaayaa.jpg" },
      { id: "s_63", title: "Nenjukkul Peidhidum", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Nenjukkul Peidhidum.jpg" },
      { id: "s_64", title: "Kannazhaga", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Kannazhaga.jpg" },
      { id: "s_65", title: "Aayiram Jenmangal", artist: "D. Imman", img: "images/D. Imman/Aayiram Jenmangal.jpg" },
      { id: "s_66", title: "Nee Partha Vizhigal", artist: "D. Imman", img: "images/D. Imman/Nee Partha Vizhigal.jpg" }
    ]
  },
  {
    id: "pl_13",
    name: "G.V. Prakash Kumar Hits",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_67", title: "Konjam Konjam", artist: "G.V. Prakash Kumar", img: "images/G.V. Prakash Kumar/Konjam Konjam.jpg" },
      { id: "s_68", title: "Nee Yaarendra", artist: "G.V. Prakash Kumar", img: "images/G.V. Prakash Kumar/Nee Yaarendra.jpg" },
      { id: "s_69", title: "Hosanna", artist: "A.R. Rahman", img: "images/A.R. Rahman/Hosanna.jpg" },
      { id: "s_70", title: "Anbil Avan", artist: "G.V. Prakash Kumar", img: "images/G.V. Prakash Kumar/Anbil Avan.jpg" },
      { id: "s_71", title: "Nee Himavandhaa", artist: "G.V. Prakash Kumar", img: "images/G.V. Prakash Kumar/Nee Himavandhaa.jpg" }
    ]
  },
  {
    id: "pl_14",
    name: "Harris Jayaraj Timeless",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_72", title: "Anbe En Anbe", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Anbe En Anbe.jpg" },
      { id: "s_73", title: "Nenjam Ellam", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Nenjam Ellam.jpg" },
      { id: "s_74", title: "Oru Deivam Thantha Poove", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Oru Deivam Thantha Poove.jpg" },
      { id: "s_75", title: "Yaaradi Nee Mohini", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Yaaradi Nee Mohini.jpg" },
      { id: "s_76", title: "Kaaney Kaaney", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Kaaney Kaaney.jpg" },
      { id: "s_77", title: "Vellai Pookal", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Vellai Pookal.jpg" }
    ]
  },
  {
    id: "pl_15",
    name: "Kadhal Romance Mix",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_78", title: "Munbe Vaa", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Munbe Vaa.jpg" },
      { id: "s_79", title: "Kadhal Rojave", artist: "A.R. Rahman", img: "images/A.R. Rahman/Kadhal Rojave.jpg" },
      { id: "s_80", title: "Thalli Pogathey", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Thalli Pogathey.jpg" },
      { id: "s_81", title: "Vinnaithaandi Varuvaayaa", artist: "A.R. Rahman", img: "images/A.R. Rahman/Vinnaithaandi Varuvaayaa.jpg" },
      { id: "s_82", title: "Oru Murai Vanthu Paarthaya", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Oru Murai Vanthu Paarthaya.jpg" },
      { id: "s_83", title: "Hosanna", artist: "A.R. Rahman", img: "images/A.R. Rahman/Hosanna.jpg" }
    ]
  },
  {
    id: "pl_16",
    name: "Tamil Rap & Hip-Hop",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_84", title: "Enjoy Enjaami", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Enjoy Enjaami.jpg" },
      { id: "s_85", title: "Bigil Theme", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Bigil Theme.jpg" },
      { id: "s_86", title: "Kutti Story", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Kutti Story.jpg" },
      { id: "s_87", title: "Neruppu Da", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Neruppu Da.jpg" },
      { id: "s_88", title: "Siriki", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Siriki.jpg" }
    ]
  },
  {
    id: "pl_17",
    name: "Kuthu Party Night",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_89", title: "Urvasi Urvasi", artist: "A.R. Rahman", img: "images/A.R. Rahman/Urvasi Urvasi.jpg" },
      { id: "s_90", title: "Aaluma Doluma", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Aaluma Doluma.jpg" },
      { id: "s_91", title: "Maari Thara Local", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Maari Thara Local.jpg" },
      { id: "s_92", title: "Chillax", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Chillax.jpg" },
      { id: "s_93", title: "Vaathi Coming", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Vaathi Coming.jpg" },
      { id: "s_94", title: "Inji Iduppazhagi", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Inji Iduppazhagi.jpg" }
    ]
  },
  {
    id: "pl_18",
    name: "Chill Lofi Tamil",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_95", title: "Kannaana Kanney", artist: "D. Imman", img: "images/D. Imman/Kannaana Kanney.jpg" },
      { id: "s_96", title: "Nenjukkul Peidhidum", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Nenjukkul Peidhidum.jpg" },
      { id: "s_97", title: "Naan Paadum Mouna Raagam", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Naan Paadum Mouna Raagam.jpg" },
      { id: "s_98", title: "Mental Manadhil", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Mental Manadhil.jpg" },
      { id: "s_99", title: "Uyire Uyire", artist: "D. Imman", img: "images/D. Imman/Uyire Uyire.jpg" }
    ]
  },
  {
    id: "pl_19",
    name: "2000s Tamil Golden Era",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1458560871784-56d23406c091?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_100", title: "Mustafa Mustafa", artist: "A.R. Rahman", img: "images/A.R. Rahman/Mustafa Mustafa.jpg" },
      { id: "s_101", title: "Anbe En Anbe", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Anbe En Anbe.jpg" },
      { id: "s_102", title: "Yaaradi Nee Mohini", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Yaaradi Nee Mohini.jpg" },
      { id: "s_103", title: "Oru Deivam Thantha Poove", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Oru Deivam Thantha Poove.jpg" },
      { id: "s_104", title: "En Iniya Pon Nilave", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/En Iniya Pon Nilave.jpg" },
      { id: "s_105", title: "Kadhal Rojave", artist: "A.R. Rahman", img: "images/A.R. Rahman/Kadhal Rojave.jpg" }
    ]
  },
  {
    id: "pl_20",
    name: "Villain BGM Collection",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_106", title: "Kabali Para", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Kabali Para.jpg" },
      { id: "s_107", title: "Kaala Kaala", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Kaala Kaala.jpg" },
      { id: "s_108", title: "Bigil Theme", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Bigil Theme.jpg" },
      { id: "s_109", title: "Beast Mode", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Beast Mode.jpg" },
      { id: "s_110", title: "Neruppu Da", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Neruppu Da.jpg" }
    ]
  },
  {
    id: "pl_21",
    name: "Mothers & Family Songs",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_111", title: "Kannaana Kanney", artist: "D. Imman", img: "images/D. Imman/Kannaana Kanney.jpg" },
      { id: "s_112", title: "Chinna Chinna Aasai", artist: "A.R. Rahman", img: "images/A.R. Rahman/Chinna Chinna Aasai.jpg" },
      { id: "s_113", title: "Aayiram Jenmangal", artist: "D. Imman", img: "images/D. Imman/Aayiram Jenmangal.jpg" },
      { id: "s_114", title: "Inaindha Kaigal", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Inaindha Kaigal.jpg" },
      { id: "s_115", title: "Naan Paadum Mouna Raagam", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Naan Paadum Mouna Raagam.jpg" }
    ]
  },
  {
    id: "pl_22",
    name: "Rain & Monsoon Mood",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_116", title: "Nenjukkul Peidhidum", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Nenjukkul Peidhidum.jpg" },
      { id: "s_117", title: "Poove Unakkaga", artist: "A.R. Rahman", img: "images/A.R. Rahman/Poove Unakkaga.jpg" },
      { id: "s_118", title: "Vellai Pookal", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Vellai Pookal.jpg" },
      { id: "s_119", title: "Kaaney Kaaney", artist: "Harris Jayaraj", img: "images/Harris Jayaraj/Kaaney Kaaney.jpg" },
      { id: "s_120", title: "Thalli Pogathey", artist: "Yuvan Shankar Raja", img: "images/Yuvan Shankar Raja/Thalli Pogathey.jpg" },
      { id: "s_121", title: "Roja Kaadhal", artist: "A.R. Rahman", img: "images/A.R. Rahman/Roja Kaadhal.jpg" }
    ]
  },
  {
    id: "pl_23",
    name: "Kollywood Top 2023",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_122", title: "Chellamma", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Chellamma.jpg" },
      { id: "s_123", title: "Siriki", artist: "Anirudh Ravichander", img: "images/Anirudh Ravichander/Siriki.jpg" },
      { id: "s_124", title: "Rekka Vecha Paravaiyada", artist: "Santhosh Narayanan", img: "images/Santhosh Narayanan/Rekka Vecha Paravaiyada.jpg" },
      { id: "s_125", title: "Anbil Avan", artist: "G.V. Prakash Kumar", img: "images/G.V. Prakash Kumar/Anbil Avan.jpg" },
      { id: "s_126", title: "Nee Partha Vizhigal", artist: "D. Imman", img: "images/D. Imman/Nee Partha Vizhigal.jpg" }
    ]
  },
  {
    id: "pl_24",
    name: "Devotional Tamil Classics",
    creator: "astraardency",
    img: "https://images.unsplash.com/photo-1545231097-cbd6b24523f9?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    hidden: true,
    songs: [
      { id: "s_127", title: "Aayiram Jenmangal", artist: "D. Imman", img: "images/D. Imman/Aayiram Jenmangal.jpg" },
      { id: "s_128", title: "Endrendrum Punnagai", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Endrendrum Punnagai.jpg" },
      { id: "s_129", title: "Unakkena Vaazhjiren", artist: "Ilaiyaraaja", img: "images/Ilaiyaraaja/Unakkena Vaazhjiren.jpg" },
      { id: "s_130", title: "Kannaana Kanney", artist: "D. Imman", img: "images/D. Imman/Kannaana Kanney.jpg" }
    ]
  }
];