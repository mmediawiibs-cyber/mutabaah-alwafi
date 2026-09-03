import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  CheckSquare,
  BarChart3,
  User,
  PlusCircle,
  LogOut,
  Copy,
  Check,
  Printer,
  MessageCircle,
  Star,
  Award,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HeartHandshake,
  Trash2,
  Edit,
  X,
  CalendarDays,
  CheckCircle2,
  Lock,
  Users,
  ExternalLink,
  FileText,
} from "lucide-react";
import { db } from "./firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const INITIAL_SANTRI = [
  // Kelas IX - Chechnya
  {
    id: "nama_santri_1",
    name: "ANNISA FARHANA SHALIHA",
    class: "IX - Chechnya",
    ttl: "Jakarta, 27 August 2012",
    nis: "242507017",
    nisn: "0129024447",
    photo: "/photos/default.jpg",
    pin: "242507017",
  },
  {
    id: "nama_santri_2",
    name: "ASHA NABILA SAIFUDIN",
    class: "IX - Chechnya",
    ttl: "Jakarta, 19 April 2012",
    nis: "242507018",
    nisn: "0125735361",
    photo: "/photos/default.jpg",
    pin: "242507018",
  },
  {
    id: "nama_santri_3",
    name: "AZKIA SAKHI",
    class: "IX - Chechnya",
    ttl: "Jakarta, 05 December 2011",
    nis: "242507021",
    nisn: "0112097503",
    photo: "/photos/default.jpg",
    pin: "242507021",
  },
  {
    id: "nama_santri_4",
    name: "KHANSA ZAFIRAH BASKORO",
    class: "IX - Chechnya",
    ttl: "Jakarta, 17 August 2011",
    nis: "242507038",
    nisn: "0119505547",
    photo: "/photos/default.jpg",
    pin: "242507038",
  },
  {
    id: "nama_santri_5",
    name: "KIARA AMINA",
    class: "IX - Chechnya",
    ttl: "Jakarta, 01 December 2011",
    nis: "242507039",
    nisn: "0114771974",
    photo: "/photos/default.jpg",
    pin: "242507039",
  },
  {
    id: "nama_santri_6",
    name: "MALIKA LATHIFA",
    class: "IX - Chechnya",
    ttl: "Bogor, 09 July 2012",
    nis: "242507042",
    nisn: "0126745351",
    photo: "/photos/default.jpg",
    pin: "242507042",
  },
  {
    id: "nama_santri_7",
    name: "MALIKA SHEREEN",
    class: "IX - Chechnya",
    ttl: "Denpasar, 12 May 2012",
    nis: "242507043",
    nisn: "0123391968",
    photo: "/photos/default.jpg",
    pin: "242507043",
  },
  {
    id: "nama_santri_8",
    name: "MARIYAH RUMAISHA KANATA",
    class: "IX - Chechnya",
    ttl: "Bandung, 30 June 2012",
    nis: "242507044",
    nisn: "0122609680",
    photo: "/photos/default.jpg",
    pin: "242507044",
  },
  {
    id: "nama_santri_9",
    name: "NABILAH ABIDAH FARAHANI",
    class: "IX - Chechnya",
    ttl: "N/A, 26 March 2012",
    nis: "242507060",
    nisn: "0122194176",
    photo: "/photos/default.jpg",
    pin: "242507060",
  },
  {
    id: "nama_santri_10",
    name: "NAYA FEBRIA AZMI",
    class: "IX - Chechnya",
    ttl: "Jakarta, 10 February 2012",
    nis: "242507062",
    nisn: "0121685168",
    photo: "/photos/default.jpg",
    pin: "242507062",
  },
  {
    id: "nama_santri_11",
    name: "SYAKIRA HUSNAYA",
    class: "IX - Chechnya",
    ttl: "Jakarta, 09 June 2012",
    nis: "242507082",
    nisn: "3128481787",
    photo: "/photos/default.jpg",
    pin: "242507082",
  },
  {
    id: "nama_santri_12",
    name: "SYARIFAH NABILA AZZAHRA WAHYUDI",
    class: "IX - Chechnya",
    ttl: "Bogor, 28 March 2012",
    nis: "242507083",
    nisn: "0126182252",
    photo: "/photos/default.jpg",
    pin: "242507083",
  },
  {
    id: "nama_santri_13",
    name: "YASYFA AMIRIA AKBAR",
    class: "IX - Chechnya",
    ttl: "Tangerang Selatan, 07 July 2012",
    nis: "242507088",
    nisn: "0126222171",
    photo: "/photos/default.jpg",
    pin: "242507088",
  },
  {
    id: "nama_santri_14",
    name: "YUMNA ZUMARNIS",
    class: "IX - Chechnya",
    ttl: "Jakarta, 10 November 2011",
    nis: "242507089",
    nisn: "3115533551",
    photo: "/photos/default.jpg",
    pin: "242507089",
  },
  {
    id: "nama_santri_15",
    name: "HALWA AZZAINA AQILAH",
    class: "IX - Chechnya",
    ttl: "N/A",
    nis: "252608114",
    nisn: "N/A",
    photo: "/photos/default.jpg",
    pin: "252608114",
  },

  // Kelas IX - Yordan
  {
    id: "nama_santri_16",
    name: "AISYAH ALIYA KAMILA",
    class: "IX - Yordan",
    ttl: "Makassar, 20 January 2011",
    nis: "242507007",
    nisn: "0128919639",
    photo: "/photos/default.jpg",
    pin: "242507007",
  },
  {
    id: "nama_santri_17",
    name: "AISYAH KHADIJAH RABBANI",
    class: "IX - Yordan",
    ttl: "N/A",
    nis: "242507097",
    nisn: "0111507273",
    photo: "/photos/default.jpg",
    pin: "242507097",
  },
  {
    id: "nama_santri_18",
    name: "AISYAH ZAHROTUL FADHILAH",
    class: "IX - Yordan",
    ttl: "Bekasi, 07 December 2011",
    nis: "242507008",
    nisn: "117456013",
    photo: "/photos/default.jpg",
    pin: "242507008",
  },
  {
    id: "nama_santri_19",
    name: "ALIYA TASNIM",
    class: "IX - Yordan",
    ttl: "N/A, 24 September 2011",
    nis: "242507012",
    nisn: "0112339380",
    photo: "/photos/default.jpg",
    pin: "242507012",
  },
  {
    id: "nama_santri_20",
    name: "FATHIYYAH WIDYANDRA",
    class: "IX - Yordan",
    ttl: "N/A, 24 December 2011",
    nis: "242507029",
    nisn: "0116613525",
    photo: "/photos/default.jpg",
    pin: "242507029",
  },
  {
    id: "nama_santri_21",
    name: "JANETHA RAINY WANG",
    class: "IX - Yordan",
    ttl: "Tangerang, 03 November 2011",
    nis: "242507035",
    nisn: "0112553340",
    photo: "/photos/default.jpg",
    pin: "242507035",
  },
  {
    id: "nama_santri_22",
    name: "KAILA KIRANA MARUKHI",
    class: "IX - Yordan",
    ttl: "Jakarta, 07 January 2012",
    nis: "242507037",
    nisn: "0128500013",
    photo: "/photos/default.jpg",
    pin: "242507037",
  },
  {
    id: "nama_santri_23",
    name: "MALIKA DYANDRA RUBINA",
    class: "IX - Yordan",
    ttl: "Jakarta, 20 July 2012",
    nis: "242507041",
    nisn: "3118625060",
    photo: "/photos/default.jpg",
    pin: "242507041",
  },
  {
    id: "nama_santri_24",
    name: "MEDINA RAISA SHALIHA",
    class: "IX - Yordan",
    ttl: "Makasar, 26 May 2012",
    nis: "242507045",
    nisn: "122533021",
    photo: "/photos/default.jpg",
    pin: "242507045",
  },
  {
    id: "nama_santri_25",
    name: "NAFEEZA ZHAHIRAH RAISA RAHMAN",
    class: "IX - Yordan",
    ttl: "Bandung, 12 April 2012",
    nis: "242507061",
    nisn: "126639709",
    photo: "/photos/default.jpg",
    pin: "242507061",
  },
  {
    id: "nama_santri_26",
    name: "PUTRI RAISYAH WICAKSONO",
    class: "IX - Yordan",
    ttl: "N/A",
    nis: "242507064",
    nisn: "0127633617",
    photo: "/photos/default.jpg",
    pin: "242507064",
  },
  {
    id: "nama_santri_27",
    name: "QONITA AZ-ZAHRA",
    class: "IX - Yordan",
    ttl: "Bogor, 17 October 2012",
    nis: "242507065",
    nisn: "0121599305",
    photo: "/photos/default.jpg",
    pin: "242507065",
  },
  {
    id: "nama_santri_28",
    name: "RAIHANA AYSHA HUSNI",
    class: "IX - Yordan",
    ttl: "N/A, 03 January 2012",
    nis: "242507071",
    nisn: "N/A",
    photo: "/photos/default.jpg",
    pin: "242507071",
  },
  {
    id: "nama_santri_29",
    name: "SHAKILA HUMAIRA ASH SHAFIYA",
    class: "IX - Yordan",
    ttl: "Jakarta, 09 June 2012",
    nis: "242507079",
    nisn: "0113555768",
    photo: "/photos/default.jpg",
    pin: "242507079",
  },
  {
    id: "nama_santri_30",
    name: "TARISA NURUL ILMA",
    class: "IX - Yordan",
    ttl: "N/A, 30 October 2011",
    nis: "242507085",
    nisn: "3118625060",
    photo: "/photos/default.jpg",
    pin: "242507085",
  },
];

const CATEGORIES = [
  { id: "kategori_1", name: "Seragam", type: "wajib" },
  { id: "kategori_4", name: "Sholat Dzuhur", type: "wajib" },
  { id: "kategori_5", name: "Sholat Ashar", type: "wajib" },
  { id: "kategori_6", name: "Makan Siang", type: "wajib" },
  { id: "kategori_2", name: "Puasa Sunnah", type: "sunnah" },
  { id: "kategori_3", name: "Sholat Dhuha", type: "sunnah" },
];

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState("ceklis");
  const [viewMode, setViewMode] = useState("harian");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedClass, setSelectedClass] = useState("Semua");

  const [santriList, setSantriList] = useState(INITIAL_SANTRI);
  const [categories, setCategories] = useState(CATEGORIES);
  const [records, setRecords] = useState({});
  const [notes, setNotes] = useState({});
  const [attendance, setAttendance] = useState({});
  const [haidStatus, setHaidStatus] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [violations, setViolations] = useState([]);

  const [modalWA, setModalWA] = useState({
    open: false,
    santriName: "",
    text: "",
  });
  const [copied, setCopied] = useState(false);

  const [publicSantriId, setPublicSantriId] = useState(null);
  const [showKatalog, setShowKatalog] = useState(false);

  const [formSantri, setFormSantri] = useState({
    name: "",
    class: "IX - Chechnya",
    nis: "",
    nisn: "",
    ttl: "",
    pin: "",
  });
  const [formAch, setFormAch] = useState({
    id: null,
    title: "",
    rank: "Juara 1",
    type: "Single",
    level: "Internal Sekolah",
    organizer: "",
    date: "",
    documentUrl: "",
    santriIds: [],
  });
  const [formVio, setFormVio] = useState({
    id: null,
    santriId: "",
    level: "Ringan",
    description: "",
    sanction: "",
    date: "",
  });

  const [editSantriId, setEditSantriId] = useState(null);
  const [editForm, setEditForm] = useState({ photo: "", pin: "" });

  const [selectedAch, setSelectedAch] = useState(null);

  const [isPortalAuth, setIsPortalAuth] = useState(false);
  const [portalPin, setPortalPin] = useState("");
  const [portalError, setPortalError] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#/view/")) {
        const sid = hash.replace("#/view/", "");
        setPublicSantriId(sid);
        setShowKatalog(false);
        if (localStorage.getItem(`auth_santri_${sid}`) === "true") {
          setIsPortalAuth(true);
        } else {
          setIsPortalAuth(false);
        }
      } else if (hash === "#/katalog") {
        setShowKatalog(true);
        setPublicSantriId(null);
      } else {
        setShowKatalog(false);
        setPublicSantriId(null);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);

    const savedAuth = localStorage.getItem("alwafi_admin_auth");
    if (savedAuth === "true") setIsAdmin(true);

    const unsubSantri = onSnapshot(doc(db, "mutabaah_data", "santri"), (d) => {
      if (d.exists() && d.data().data) setSantriList(d.data().data);
    });
    const unsubCat = onSnapshot(doc(db, "mutabaah_data", "categories"), (d) => {
      if (d.exists() && d.data().data) setCategories(d.data().data);
    });
    const unsubRec = onSnapshot(doc(db, "mutabaah_data", "records"), (d) => {
      if (d.exists() && d.data().data) setRecords(d.data().data);
    });
    const unsubNotes = onSnapshot(doc(db, "mutabaah_data", "notes"), (d) => {
      if (d.exists() && d.data().data) setNotes(d.data().data);
    });
    const unsubAtt = onSnapshot(doc(db, "mutabaah_data", "attendance"), (d) => {
      if (d.exists() && d.data().data) setAttendance(d.data().data);
    });
    const unsubHaid = onSnapshot(doc(db, "mutabaah_data", "haid"), (d) => {
      if (d.exists() && d.data().data) setHaidStatus(d.data().data);
    });
    const unsubAch = onSnapshot(
      doc(db, "mutabaah_data", "achievements"),
      (d) => {
        if (d.exists() && d.data().data) setAchievements(d.data().data);
      },
    );
    const unsubVio = onSnapshot(doc(db, "mutabaah_data", "violations"), (d) => {
      if (d.exists() && d.data().data) setViolations(d.data().data);
    });

    return () => {
      window.removeEventListener("hashchange", handleHash);
      unsubSantri();
      unsubCat();
      unsubRec();
      unsubNotes();
      unsubAtt();
      unsubHaid();
      unsubAch();
      unsubVio();
    };
  }, []);

  const saveToFirebase = async (collectionName, data) => {
    try {
      await setDoc(doc(db, "mutabaah_data", collectionName), { data });
    } catch (e) {
      console.error("Gagal simpan ke Firebase:", e);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "sayaadmin") {
      setIsAdmin(true);
      localStorage.setItem("alwafi_admin_auth", "true");
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("alwafi_admin_auth");
  };

  const handlePortalLogin = (e, correctPin) => {
    e.preventDefault();
    if (portalPin === correctPin) {
      localStorage.setItem(`auth_santri_${publicSantriId}`, "true");
      setIsPortalAuth(true);
      setPortalError(false);
      setPortalPin("");
    } else {
      setPortalError(true);
    }
  };

  const handlePortalLogout = () => {
    localStorage.removeItem(`auth_santri_${publicSantriId}`);
    setIsPortalAuth(false);
  };

  const getFormattedDate = (dateString) => {
    const d = new Date(dateString);
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    return `${days[d.getDay()]}, ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  };

  const changeDate = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  const getKehadiranText = (code) => {
    switch (code) {
      case "I":
        return "Izin";
      case "S":
        return "Sakit";
      case "A":
        return "Alpha";
      default:
        return "Hadir";
    }
  };

  const filteredSantri = useMemo(() => {
    if (selectedClass === "Semua") return santriList;
    return santriList.filter((s) => s.class === selectedClass);
  }, [santriList, selectedClass]);

  const toggleCheck = (santriId, catId) => {
    const key = `${selectedDate}_${santriId}_${catId}`;
    const updated = { ...records, [key]: !records[key] };
    setRecords(updated);
    saveToFirebase("records", updated);
  };

  const toggleHaid = (santriId) => {
    const key = `${selectedDate}_${santriId}`;
    const updated = { ...haidStatus, [key]: !haidStatus[key] };
    setHaidStatus(updated);
    saveToFirebase("haid", updated);
  };

  const setSantriAttendance = (santriId, status) => {
    const key = `${selectedDate}_${santriId}`;
    const updated = { ...attendance, [key]: status };
    setAttendance(updated);
    saveToFirebase("attendance", updated);
  };

  const handleAutoCheckAll = () => {
    const updated = { ...records };
    filteredSantri.forEach((s) => {
      // Hanya auto-ceklis jika status kehadiran Hadir (H)
      const att = attendance[`${selectedDate}_${s.id}`] || "H";
      if (att === "H") {
        categories.forEach((c) => {
          const key = `${selectedDate}_${s.id}_${c.id}`;
          updated[key] = true;
        });
      }
    });
    setRecords(updated);
    saveToFirebase("records", updated);
  };

  const handleAutoUncheckAll = () => {
    const updated = { ...records };
    filteredSantri.forEach((s) => {
      categories.forEach((c) => {
        const key = `${selectedDate}_${s.id}_${c.id}`;
        delete updated[key];
      });
    });
    setRecords(updated);
    saveToFirebase("records", updated);
  };

  const handleNoteChange = (santriId, text) => {
    const key = `${selectedDate}_${santriId}`;
    const updated = { ...notes, [key]: text };
    setNotes(updated);
    saveToFirebase("notes", updated);
  };

  // LOGIKA SKOR BARU (Sakit 100%, Izin/Alpha 0%)
  const calculateScore = (santriId, targetDate = selectedDate) => {
    const att = attendance[`${targetDate}_${santriId}`] || "H";
    const isHaid = !!haidStatus[`${targetDate}_${santriId}`];
    const wajibCats = categories.filter((c) => c.type === "wajib");
    const sunnahCats = categories.filter((c) => c.type === "sunnah");

    let completedWajib = 0;
    let stars = 0;

    if (att === "I" || att === "A") {
      // Izin atau Alpha: Nilai 0 mutlak
      completedWajib = 0;
      stars = 0;
    } else if (att === "S") {
      // Sakit: Wajib diberi udzur (100%), Sunnah 0
      completedWajib = wajibCats.length;
      stars = 0;
    } else {
      // Hadir (H)
      wajibCats.forEach((c) => {
        if (isHaid && (c.name.includes("Sholat") || c.name.includes("Puasa"))) {
          completedWajib += 1;
        } else if (records[`${targetDate}_${santriId}_${c.id}`]) {
          completedWajib += 1;
        }
      });
      sunnahCats.forEach((c) => {
        if (records[`${targetDate}_${santriId}_${c.id}`]) stars += 1;
      });
    }

    const percent = wajibCats.length
      ? Math.round((completedWajib / wajibCats.length) * 100)
      : 0;
    return { percent, stars, isHaid, sunnahTotal: sunnahCats.length };
  };

  const openWAModal = (santri) => {
    const isHaid = !!haidStatus[`${selectedDate}_${santri.id}`];
    const attCode = attendance[`${selectedDate}_${santri.id}`] || "H";
    const note =
      notes[`${selectedDate}_${santri.id}`] ||
      "Alhamdulillah tidak ada catatan khusus hari ini.";

    let summaryList = categories
      .map((c) => {
        let isChecked = "";
        if (attCode === "I" || attCode === "A") {
          isChecked = "-"; // Kosong jika Izin/Alpha
        } else if (attCode === "S") {
          isChecked = c.type === "wajib" ? "Udzur (Sakit)" : "-";
        } else {
          const isRestricted =
            isHaid && (c.name.includes("Sholat") || c.name.includes("Puasa"));
          isChecked = isRestricted
            ? "Udzur Syar'i (Haid)"
            : records[`${selectedDate}_${santri.id}_${c.id}`]
              ? "Terlaksana"
              : "Belum";
        }
        return `• ${c.name}: ${isChecked}`;
      })
      .join("\n");

    const message =
      `*LAPORAN MUTABAAH HARIAN AL WAFI IIBS*\n` +
      `Bismillah, Assalamu'alaikum Ummu, berikut laporan mutabaah harian ananda:\n\n` +
      `Santriwati: *${santri.name}* (${santri.class})\n` +
      `Tanggal: ${getFormattedDate(selectedDate)}\n` +
      `Kehadiran: *${getKehadiranText(attCode)}* ${isHaid ? "(Status: Udzur/Haid)" : ""}\n\n` +
      `*Rekap Mutabaah:*\n${summaryList}\n\n` +
      `*Catatan Walas:* ${note}\n\n` +
      `_Barakallahu fiikum._\n` +
      `Ummu bisa melihat portofolio lengkap ananda di: https://${window.location.host}/#/view/${santri.id}`;

    setModalWA({ open: true, santriName: santri.name, text: message });
  };

  // GENERATOR WA GRUP BARU (Sesuai Permintaan User Terakhir)
  const openWAGroupModal = () => {
    const rombelName =
      selectedClass === "Semua" ? "SEMUA KELAS" : selectedClass;
    const tanggalFormatted = getFormattedDate(selectedDate);

    // 1. Tidak Hadir (Hanya yang statusnya I, S, A)
    const absensiList = filteredSantri
      .filter((s) => {
        const att = attendance[`${selectedDate}_${s.id}`] || "H";
        return att !== "H";
      })
      .map((s) => {
        const att = attendance[`${selectedDate}_${s.id}`];
        return `- ${s.name} (${getKehadiranText(att)})`;
      });
    const tidakHadirText =
      absensiList.length > 0 ? absensiList.join("\n") : "- Nihil (Semua Hadir)";

    // Helper: Mendapatkan daftar santri yang gagal di kategori tertentu
    // Syarat: Dia Hadir (H), dan jika kategori sholat/puasa, dia tidak sedang Haid.
    const getGagalList = (catKeyword) => {
      const cat = categories.find((c) =>
        c.name.toLowerCase().includes(catKeyword.toLowerCase()),
      );
      if (!cat) return "-";

      const list = filteredSantri
        .filter((s) => {
          const att = attendance[`${selectedDate}_${s.id}`] || "H";
          if (att !== "H") return false; // Abaikan jika sakit/izin/alpha

          const isHaid = !!haidStatus[`${selectedDate}_${s.id}`];
          if (
            isHaid &&
            (cat.name.includes("Sholat") || cat.name.includes("Puasa"))
          )
            return false;

          const isChecked = !!records[`${selectedDate}_${s.id}_${cat.id}`];
          return !isChecked; // Masuk daftar jika TIDAK terceklis
        })
        .map((s) => `- ${s.name}`);

      return list.length > 0 ? list.join("\n") : "- Nihil";
    };

    const tidakBerseragam = getGagalList("seragam");
    const tidakMakanSiang = getGagalList("makan siang");
    const tidakDzuhur = getGagalList("dzuhur");
    const tidakAshar = getGagalList("ashar");

    // Sholat Dhuha (Mendata yang CEKLIS saja)
    const dhuhaCat = categories.find((c) =>
      c.name.toLowerCase().includes("dhuha"),
    );
    let dhuhaText = "- Nihil";
    if (dhuhaCat) {
      // Ambil total santri yang Hadir
      const presentSantri = filteredSantri.filter(
        (s) => (attendance[`${selectedDate}_${s.id}`] || "H") === "H",
      );
      // Hitung dari yang hadir, siapa yang sholat Dhuha
      const dhuhaSantri = presentSantri.filter(
        (s) => records[`${selectedDate}_${s.id}_${dhuhaCat.id}`],
      );

      if (
        dhuhaSantri.length === presentSantri.length &&
        presentSantri.length > 0
      ) {
        dhuhaText = "Alhamdulillah hari ini seluruh santri sholat dhuha";
      } else if (dhuhaSantri.length > 0) {
        dhuhaText = dhuhaSantri.map((s) => `- ${s.name}`).join("\n");
      }
    }

    // Puasa Sunnah (Mendata yang CEKLIS saja)
    const puasaCat = categories.find((c) =>
      c.name.toLowerCase().includes("puasa"),
    );
    let puasaText = "- Nihil";
    if (puasaCat) {
      const puasaSantri = filteredSantri.filter((s) => {
        const att = attendance[`${selectedDate}_${s.id}`] || "H";
        if (att !== "H") return false;
        return records[`${selectedDate}_${s.id}_${puasaCat.id}`];
      });
      if (puasaSantri.length > 0) {
        puasaText = puasaSantri.map((s) => `- ${s.name}`).join("\n");
      }
    }

    // Haidh
    const haidList = filteredSantri
      .filter((s) => !!haidStatus[`${selectedDate}_${s.id}`])
      .map((s) => `- ${s.name}`);
    const haidText = haidList.length > 0 ? haidList.join("\n") : "- Nihil";

    const groupMessage =
      `LAPORAN HARIAN - ${rombelName}\n` +
      `${tanggalFormatted}\n\n` +
      `Tidak hadir:\n${tidakHadirText}\n\n` +
      `Tidak berseragam:\n${tidakBerseragam}\n\n` +
      `Tidak Makan siang:\n${tidakMakanSiang}\n\n` +
      `Tidak Sholat Dzuhur berjamaah:\n${tidakDzuhur}\n\n` +
      `Tidak Sholat Ashar berjamaah:\n${tidakAshar}\n\n` +
      `Sholat Dhuha:\n${dhuhaText}\n\n` +
      `Puasa sunnah:\n${puasaText}\n\n` +
      `Haidh:\n${haidText}\n\n` +
      `Semoga Allah senantiasa memberikan kemudahan dan keberkahan-Nya serta ananda dapat selalu istiqomah 🌸🙏🏻\n\n` +
      `_Aamiin Yaa Rabbal'alamiin_\n` +
      `_Barakallahu fiikum wa fiihin_`;

    setModalWA({
      open: true,
      santriName: `Laporan Harian Grup ${rombelName}`,
      text: groupMessage,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(modalWA.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveAchievement = (e) => {
    e.preventDefault();
    if (!formAch.title || formAch.santriIds.length === 0) return;

    let updated;
    if (formAch.id) {
      updated = achievements.map((a) =>
        a.id === formAch.id ? { ...formAch } : a,
      );
    } else {
      updated = [...achievements, { ...formAch, id: `ach_${Date.now()}` }];
    }
    setAchievements(updated);
    saveToFirebase("achievements", updated);
    setFormAch({
      id: null,
      title: "",
      rank: "Juara 1",
      type: "Single",
      level: "Internal Sekolah",
      organizer: "",
      date: "",
      documentUrl: "",
      santriIds: [],
    });
  };

  const deleteAchievement = (id) => {
    const updated = achievements.filter((a) => a.id !== id);
    setAchievements(updated);
    saveToFirebase("achievements", updated);
  };

  const saveViolation = (e) => {
    e.preventDefault();
    if (!formVio.santriId || !formVio.description) return;

    let updated;
    if (formVio.id) {
      updated = violations.map((v) =>
        v.id === formVio.id ? { ...formVio } : v,
      );
    } else {
      updated = [...violations, { ...formVio, id: `vio_${Date.now()}` }];
    }
    setViolations(updated);
    saveToFirebase("violations", updated);
    setFormVio({
      id: null,
      santriId: "",
      level: "Ringan",
      description: "",
      sanction: "",
      date: "",
    });
  };

  const deleteViolation = (id) => {
    const updated = violations.filter((v) => v.id !== id);
    setViolations(updated);
    saveToFirebase("violations", updated);
  };

  const addSantri = (e) => {
    e.preventDefault();
    if (!formSantri.name) return;
    const defaultPin = formSantri.pin || formSantri.nis;
    const newS = {
      ...formSantri,
      id: `santri_${Date.now()}`,
      photo: `/photos/default.jpg`,
      pin: defaultPin,
    };
    const updated = [...santriList, newS];
    setSantriList(updated);
    saveToFirebase("santri", updated);
    setFormSantri({
      name: "",
      class: "IX - Chechnya",
      nis: "",
      nisn: "",
      ttl: "",
      pin: "",
    });
  };

  const saveSantriDataUpdate = (santriId) => {
    const updated = santriList.map((s) =>
      s.id === santriId
        ? { ...s, photo: editForm.photo, pin: editForm.pin }
        : s,
    );
    setSantriList(updated);
    saveToFirebase("santri", updated);
    setEditSantriId(null);
  };

  const deleteSantri = (id) => {
    if (
      window.confirm(
        "Yakin ingin menghapus santri ini secara permanen dari sistem?",
      )
    ) {
      const updated = santriList.filter((s) => s.id !== id);
      setSantriList(updated);
      saveToFirebase("santri", updated);
    }
  };

  const weekData = useMemo(() => {
    const curr = new Date(selectedDate);
    const day = curr.getDay();
    const diff = curr.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(new Date(curr).setDate(diff));

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const d = new Date(new Date(monday).setDate(monday.getDate() + i));
      const isPastOrToday = d <= today;
      days.push({
        dateString: d.toISOString().split("T")[0],
        label: d.getDate().toString().padStart(2, "0"),
        dayName: [
          "Minggu",
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
        ][d.getDay()],
        isActive: isPastOrToday,
      });
    }
    return days;
  }, [selectedDate]);

  // ---- RENDER KATALOG SANTRI (PUBLIC INDEX) ----
  if (showKatalog) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-3 mb-10 pt-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#1356e2] to-[#d38cf6] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-800">
              Katalog Wali Santri
            </h1>
            <p className="text-slate-500 font-medium max-w-lg mx-auto">
              Silakan cari dan klik nama ananda untuk melihat rincian laporan
              mutabaah harian & pekanan.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {santriList.map((s) => (
              <a
                key={s.id}
                href={`#/view/${s.id}`}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-slate-100 border-4 border-slate-50 overflow-hidden mb-3 group-hover:border-blue-100 transition-colors shadow-sm">
                  <img
                    src={s.photo}
                    alt={s.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80";
                    }}
                  />
                </div>
                <h4 className="font-bold text-slate-800 text-sm leading-tight line-clamp-2 group-hover:text-[#1356e2] transition-colors">
                  {s.name}
                </h4>
                <span className="mt-2 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                  {s.class}
                </span>
              </a>
            ))}
          </div>
          <div className="text-center pt-8">
            <a
              href="#/"
              className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
            >
              Admin Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ---- RENDER PORTAL WALI SANTRI (INDIVIDU) ----
  if (publicSantriId) {
    const santri =
      santriList.find((s) => s.id === publicSantriId) || INITIAL_SANTRI[0];
    const santriPin = santri.pin || santri.nis;

    if (!isPortalAuth && !isAdmin) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-slate-200">
            <a
              href="#/katalog"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-[#1356e2] transition-colors mb-6 uppercase tracking-wider"
            >
              <ChevronLeft className="w-3 h-3" /> Kembali ke Katalog
            </a>
            <div className="w-24 h-24 mx-auto bg-slate-50 rounded-full overflow-hidden border-4 border-slate-200 shadow-inner mb-4 flex items-center justify-center">
              <img
                src={santri.photo}
                alt={santri.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">
              {santri.name}
            </h2>
            <p className="text-sm text-slate-500 font-medium mb-6">
              Silakan buka gembok untuk melihat laporan.
            </p>

            <form
              onSubmit={(e) => handlePortalLogin(e, santriPin)}
              className="space-y-4"
            >
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="Masukkan PIN Ananda..."
                  value={portalPin}
                  onChange={(e) => setPortalPin(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-center font-bold tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-[#1356e2] focus:border-transparent transition-all"
                />
              </div>
              {portalError && (
                <p className="text-xs text-red-500 font-bold bg-red-50 py-2 rounded-lg border border-red-100">
                  PIN tidak sesuai. Silakan periksa kembali.
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#1356e2] to-[#d38cf6] text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all flex justify-center items-center gap-2"
              >
                Buka Portofolio
              </button>
            </form>
          </div>
        </div>
      );
    }

    const santriAch = achievements.filter((a) =>
      a.santriIds.includes(santri.id),
    );
    const santriVio = violations.filter((v) => v.santriId === santri.id);

    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            {isAdmin ? (
              <a
                href="#/"
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1356e2] transition-colors bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Kembali ke Admin
              </a>
            ) : (
              <a
                href="#/katalog"
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1356e2] transition-colors bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Kembali ke Katalog
              </a>
            )}

            {!isAdmin && (
              <button
                onClick={handlePortalLogout}
                className="flex items-center gap-2 text-xs font-bold text-red-500 bg-white shadow-sm px-3 py-2 rounded-lg border border-red-100 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-4 h-4" /> Kunci Layar
              </button>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1356e2] to-[#d38cf6] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-24 h-32 rounded-2xl bg-white/20 border-2 border-white/40 overflow-hidden flex items-center justify-center shadow-inner">
                <img
                  src={santri.photo}
                  alt={santri.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80";
                  }}
                />
              </div>
              <div>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide uppercase flex items-center w-max gap-1">
                  <User className="w-3 h-3" /> Portofolio Ananda
                </span>
                <h1 className="text-2xl md:text-3xl font-black mt-2">
                  {santri.name}
                </h1>
                <p className="text-white/90 text-sm font-medium">
                  Kelas {santri.class} — Al Wafi IIBS
                </p>
                <div className="flex flex-wrap gap-3 mt-3 text-xs opacity-90">
                  <span>
                    NIS: <b>{santri.nis}</b>
                  </span>
                  <span>
                    NISN: <b>{santri.nisn}</b>
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0">
              <p className="text-sm font-medium text-white/90 mb-1">
                {getFormattedDate(selectedDate)}
              </p>
              <p className="text-xs uppercase font-bold text-white/80">
                Skor Kegiatan Wajib
              </p>
              <p className="text-4xl font-black text-[#f0b732] mt-1">
                {calculateScore(santri.id).percent}%
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1356e2]" />
                <h3 className="font-bold text-slate-800 text-lg">
                  Detail Mutabaah Harian
                </h3>
              </div>

              <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100 w-max">
                <button
                  onClick={() => changeDate(-1)}
                  className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 hover:text-[#1356e2] hover:bg-blue-50 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <label className="relative flex items-center justify-center px-4 py-2 cursor-pointer hover:text-[#1356e2] transition-colors font-bold text-xs sm:text-sm text-slate-700 min-w-[140px] text-center">
                  {getFormattedDate(selectedDate)}
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </label>
                <button
                  onClick={() => changeDate(1)}
                  className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 hover:text-[#1356e2] hover:bg-blue-50 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-2">
                Status Kehadiran:
                <span
                  className={`px-2 py-0.5 rounded ${attendance[`${selectedDate}_${santri.id}`] === "I" || attendance[`${selectedDate}_${santri.id}`] === "S" ? "bg-amber-100 text-amber-700" : attendance[`${selectedDate}_${santri.id}`] === "A" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}
                >
                  {getKehadiranText(
                    attendance[`${selectedDate}_${santri.id}`] || "H",
                  )}
                </span>
              </div>
              <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-2">
                Kondisi:
                <span
                  className={`px-2 py-0.5 rounded ${haidStatus[`${selectedDate}_${santri.id}`] ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"}`}
                >
                  {haidStatus[`${selectedDate}_${santri.id}`]
                    ? "Udzur Syar'i"
                    : "Suci"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((c) => {
                const attCode =
                  attendance[`${selectedDate}_${santri.id}`] || "H";
                const isHaid = !!haidStatus[`${selectedDate}_${santri.id}`];
                const isRestricted =
                  isHaid &&
                  (c.name.includes("Sholat") || c.name.includes("Puasa"));
                const isChecked =
                  records[`${selectedDate}_${santri.id}_${c.id}`];

                let statusText = "Belum Terlaksana";
                let statusColor = "text-rose-600 bg-rose-50 border-rose-100";

                if (attCode === "I" || attCode === "A") {
                  statusText = "-";
                  statusColor = "text-slate-500 bg-slate-50 border-slate-200";
                } else if (attCode === "S") {
                  if (c.type === "wajib") {
                    statusText = "Udzur (Sakit)";
                    statusColor = "text-amber-600 bg-amber-50 border-amber-100";
                  } else {
                    statusText = "-";
                    statusColor = "text-slate-500 bg-slate-50 border-slate-200";
                  }
                } else {
                  if (isRestricted) {
                    statusText = "Udzur Syar'i (Haid)";
                    statusColor = "text-pink-600 bg-pink-50 border-pink-100";
                  } else if (isChecked) {
                    statusText = "Terlaksana";
                    statusColor =
                      "text-emerald-600 bg-emerald-50 border-emerald-100";
                  }
                }

                return (
                  <div
                    key={c.id}
                    className={`p-3 rounded-xl border flex justify-between items-center ${statusColor}`}
                  >
                    <span className="text-sm font-bold">
                      {c.name}{" "}
                      <span className="text-[10px] font-normal opacity-70">
                        ({c.type})
                      </span>
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/50 rounded-md">
                      {statusText}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm">
              <span className="font-bold text-blue-800 block mb-1">
                Catatan Harian Walas:
              </span>
              <span className="text-blue-900 leading-relaxed font-medium italic">
                "
                {notes[`${selectedDate}_${santri.id}`] ||
                  "Alhamdulillah tidak ada catatan khusus hari ini."}
                "
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-5 h-5 text-[#1356e2]" />
              <h3 className="font-bold text-slate-800 text-lg">
                Rekap Pekan Ini{" "}
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded ml-2 hidden sm:inline-block">
                  ({weekData[0].dateString} s.d {weekData[6].dateString})
                </span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase">
                    <th className="pb-3 px-2">Hari, Tanggal</th>
                    <th className="pb-3 px-2 text-center">Wajib</th>
                    <th className="pb-3 px-2 text-center">Sunnah</th>
                    <th className="pb-3 px-2 text-center">Skor Wajib</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {weekData.map((d) => {
                    if (!d.isActive) {
                      return (
                        <tr key={d.dateString}>
                          <td className="py-3 px-2 text-slate-400">
                            {d.dayName}, {d.label}
                          </td>
                          <td className="py-3 px-2 text-center text-slate-300">
                            -
                          </td>
                          <td className="py-3 px-2 text-center text-slate-300">
                            -
                          </td>
                          <td className="py-3 px-2 text-center text-slate-300">
                            -
                          </td>
                        </tr>
                      );
                    }

                    const score = calculateScore(santri.id, d.dateString);
                    const wajibCats = categories.filter(
                      (c) => c.type === "wajib",
                    ).length;

                    const isHaid = !!haidStatus[`${d.dateString}_${santri.id}`];
                    const attCode =
                      attendance[`${d.dateString}_${santri.id}`] || "H";

                    let completedWajib = 0;
                    if (attCode === "I" || attCode === "A") {
                      completedWajib = 0;
                    } else if (attCode === "S") {
                      completedWajib = wajibCats;
                    } else {
                      categories
                        .filter((c) => c.type === "wajib")
                        .forEach((c) => {
                          if (
                            isHaid &&
                            (c.name.includes("Sholat") ||
                              c.name.includes("Puasa"))
                          )
                            completedWajib++;
                          else if (
                            records[`${d.dateString}_${santri.id}_${c.id}`]
                          )
                            completedWajib++;
                        });
                    }

                    return (
                      <tr key={d.dateString} className="hover:bg-slate-50">
                        <td className="py-3 px-2 font-semibold text-slate-700">
                          {d.dayName}, {d.label}
                          {isHaid && attCode === "H" && (
                            <span className="text-[10px] bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded ml-2">
                              Udzur
                            </span>
                          )}
                          {attCode !== "H" && (
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded ml-2">
                              {getKehadiranText(attCode)}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {completedWajib} / {wajibCats}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                            {score.stars} / {score.sunnahTotal}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className="font-black text-slate-800">
                            {score.percent}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-[#1356e2]" />
                <h3 className="font-bold text-slate-800 text-lg">
                  Portofolio Prestasi
                </h3>
              </div>
              {santriAch.length === 0 ? (
                <p className="text-sm text-slate-400 italic">
                  Belum ada catatan perlombaan terdaftar.
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {santriAch.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setSelectedAch(a)}
                      className="w-full text-left p-4 rounded-2xl bg-blue-50/50 border border-blue-100 hover:bg-blue-100/50 hover:border-blue-300 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-blue-900 text-sm group-hover:text-blue-700">
                          {a.title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f0b732] text-white shrink-0 ml-2">
                          {a.rank}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {a.level} • {a.organizer}
                      </p>
                      <div className="mt-2 text-[10px] font-bold text-blue-600 flex items-center gap-1 opacity-70 group-hover:opacity-100">
                        Klik untuk melihat lampiran/detail{" "}
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-800 text-lg">
                  Catatan Kedisiplinan
                </h3>
              </div>
              {santriVio.length === 0 ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm font-medium border border-emerald-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />{" "}
                  Alhamdulillah, tidak ada pelanggaran.
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {santriVio.map((v) => (
                    <div
                      key={v.id}
                      className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-200">
                          Tingkat {v.level}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {v.date}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-700 mt-2">
                        {v.description}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Sanksi:{" "}
                        <span className="font-medium text-slate-700">
                          {v.sanction}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- RENDER HALAMAN LOGIN ADMIN ----
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#1356e2] to-[#d38cf6] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-800">
              Mutabaah Banat
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Kelas IX Banat — Al Wafi IIBS
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Kata Sandi Super-Admin
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1356e2] text-sm"
              />
            </div>
            {authError && (
              <p className="text-xs text-red-500 font-medium">
                Kata sandi tidak valid.
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1356e2] to-[#d38cf6] text-white font-bold text-sm shadow-md hover:opacity-90 transition-all"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
        <a
          href="#/katalog"
          className="mt-8 text-sm font-bold text-white/80 hover:text-white transition-colors bg-white/10 px-6 py-3 rounded-xl backdrop-blur-md"
        >
          Masuk sebagai Wali Santri? Klik di sini
        </a>
      </div>
    );
  }

  // ---- RENDER DASHBOARD ADMIN ----
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      <aside className="w-full md:w-64 bg-white border-r border-slate-100 p-6 flex flex-col justify-between print:hidden shadow-sm">
        <div className="space-y-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1356e2] to-[#d38cf6] flex items-center justify-center text-white font-black text-sm">
                IX
              </div>
              <h2 className="text-lg font-black text-slate-800 leading-tight">
                Al Wafi IIBS
              </h2>
            </div>
            <p className="text-xs font-semibold text-slate-400 pl-10">
              Mutabaah Banat
            </p>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "ceklis", name: "Mutabaah & Ceklis", icon: CheckSquare },
              { id: "profil", name: "Profil & Card Santri", icon: User },
              { id: "prestasi", name: "Portofolio Prestasi", icon: Award },
              {
                id: "pelanggaran",
                name: "Catatan Kedisiplinan",
                icon: AlertTriangle,
              },
              { id: "pengaturan", name: "Kelola Data", icon: PlusCircle },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === m.id
                      ? "bg-gradient-to-r from-[#1356e2] to-[#d38cf6] text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {m.name}
                </button>
              );
            })}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all mt-6"
        >
          <LogOut className="w-4 h-4" /> Keluar Sesi
        </button>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto space-y-6">
        {/* HEADER FILTER KELAS & TOMBOL WA GRUP */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm print:hidden">
          <div>
            <h2 className="text-xl font-black text-slate-800">
              Dashboard Mutabaah
            </h2>
            <p className="text-sm text-slate-500">
              Kelola data kedisiplinan dan ibadah santriwati.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openWAGroupModal}
              className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200 hover:bg-emerald-100 flex items-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Kirim WA Grup (Laporan
              Harian)
            </button>
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 pl-2">
                Filter Rombel:
              </span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-white border border-slate-200 text-sm font-bold text-slate-800 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Semua">Semua Kelas</option>
                <option value="IX - Chechnya">IX - Chechnya</option>
                <option value="IX - Yordan">IX - Yordan</option>
              </select>
            </div>
          </div>
        </header>

        {activeTab === "ceklis" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm print:hidden">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <label className="relative cursor-pointer flex items-center justify-center w-10 h-10 bg-blue-50 text-[#1356e2] rounded-xl hover:bg-blue-100 transition-colors">
                    <Calendar className="w-5 h-5 pointer-events-none" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </label>
                  <div>
                    <h3 className="text-base font-black text-slate-800">
                      {getFormattedDate(selectedDate)}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Tanggal Pencatatan
                    </p>
                  </div>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewMode("harian")}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${viewMode === "harian" ? "bg-white shadow-sm text-blue-600" : "text-slate-500"}`}
                  >
                    Harian
                  </button>
                  <button
                    onClick={() => setViewMode("pekanan")}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${viewMode === "pekanan" ? "bg-white shadow-sm text-blue-600" : "text-slate-500"}`}
                  >
                    Pekanan
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {viewMode === "harian" && (
                  <>
                    <button
                      onClick={handleAutoCheckAll}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1356e2] to-[#d38cf6] text-white text-xs font-bold shadow-sm hover:opacity-95 flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Auto-Ceklis
                    </button>
                    <button
                      onClick={handleAutoUncheckAll}
                      className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 text-xs font-bold hover:bg-rose-100 flex items-center gap-2 shadow-sm transition-all"
                    >
                      <X className="w-4 h-4" /> Auto-Unceklis
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" /> Cetak
                    </button>
                  </>
                )}
              </div>
            </div>

            {viewMode === "harian" ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#1356e2] to-[#d38cf6] text-white text-xs uppercase font-bold tracking-wider">
                        <th className="py-4 px-4 rounded-tl-3xl">Santriwati</th>
                        <th className="py-4 px-2 text-center">Kehadiran</th>
                        <th className="py-4 px-2 text-center">Haid</th>
                        {categories.map((c) => (
                          <th key={c.id} className="py-4 px-2 text-center">
                            {c.name}
                          </th>
                        ))}
                        <th className="py-4 px-2 text-center">Skor</th>
                        <th className="py-4 px-4 text-right rounded-tr-3xl">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSantri.map((s) => {
                        const att =
                          attendance[`${selectedDate}_${s.id}`] || "H";
                        const isHaid = !!haidStatus[`${selectedDate}_${s.id}`];
                        const score = calculateScore(s.id);
                        return (
                          <tr
                            key={s.id}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="py-3 px-4 font-bold text-slate-800">
                              {s.name}
                              <span className="block text-[10px] text-slate-400 font-normal">
                                {s.class}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
                                {["H", "I", "S", "A"].map((status) => (
                                  <button
                                    key={status}
                                    onClick={() =>
                                      setSantriAttendance(s.id, status)
                                    }
                                    className={`px-2 py-1 rounded-md transition-all ${
                                      att === status
                                        ? status === "H"
                                          ? "bg-emerald-500 text-white"
                                          : status === "A"
                                            ? "bg-red-500 text-white"
                                            : "bg-amber-400 text-white"
                                        : "text-slate-400 hover:text-slate-700"
                                    }`}
                                  >
                                    {status}
                                  </button>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <button
                                onClick={() => toggleHaid(s.id)}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                                  isHaid
                                    ? "bg-pink-100 text-pink-600 border border-pink-200"
                                    : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                                }`}
                              >
                                {isHaid ? "Udzur" : "Suci"}
                              </button>
                            </td>
                            {categories.map((c) => {
                              const checked =
                                !!records[`${selectedDate}_${s.id}_${c.id}`];
                              let statusElement;

                              if (att === "I" || att === "A") {
                                statusElement = (
                                  <span className="text-[10px] font-bold text-slate-400">
                                    -
                                  </span>
                                );
                              } else if (att === "S") {
                                if (c.type === "wajib")
                                  statusElement = (
                                    <span className="text-[10px] font-bold text-amber-500 px-2 py-0.5 bg-amber-50 rounded border border-amber-100">
                                      Udzur
                                    </span>
                                  );
                                else
                                  statusElement = (
                                    <span className="text-[10px] font-bold text-slate-400">
                                      -
                                    </span>
                                  );
                              } else {
                                // Jika Hadir
                                const isRestricted =
                                  isHaid &&
                                  (c.name.includes("Sholat") ||
                                    c.name.includes("Puasa"));
                                if (isRestricted) {
                                  statusElement = (
                                    <span className="text-[10px] font-bold text-pink-500 px-2 py-0.5 bg-pink-50 rounded border border-pink-100">
                                      Udzur
                                    </span>
                                  );
                                } else {
                                  statusElement = (
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() => toggleCheck(s.id, c.id)}
                                      className={`w-5 h-5 rounded border-2 cursor-pointer transition-all ${
                                        c.type === "sunnah"
                                          ? "text-emerald-500 focus:ring-emerald-400"
                                          : "text-[#1356e2] focus:ring-blue-400"
                                      }`}
                                    />
                                  );
                                }
                              }

                              return (
                                <td
                                  key={c.id}
                                  className="py-3 px-2 text-center"
                                >
                                  {statusElement}
                                </td>
                              );
                            })}
                            <td className="py-3 px-2 text-center">
                              <span className="font-black text-slate-800">
                                {score.percent}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <input
                                  type="text"
                                  value={notes[`${selectedDate}_${s.id}`] || ""}
                                  onChange={(e) =>
                                    handleNoteChange(s.id, e.target.value)
                                  }
                                  placeholder="Notes..."
                                  className="px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs w-28 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                                />
                                <button
                                  onClick={() => openWAModal(s)}
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                  title="Kirim WA Individu"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800">
                    Rata-Rata Pekanan (Senin - Minggu)
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {weekData[0].dateString} - {weekData[6].dateString}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase font-bold">
                        <th className="pb-3">Santri</th>
                        {weekData.map((d) => (
                          <th
                            key={d.dateString}
                            className={`pb-3 text-center ${d.isActive ? "text-blue-600" : ""}`}
                          >
                            {d.label}
                          </th>
                        ))}
                        <th className="pb-3 text-center">Rata-Rata</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSantri.map((s) => {
                        let totalPercent = 0;
                        let activeDays = 0;
                        return (
                          <tr key={s.id} className="hover:bg-slate-50">
                            <td className="py-3 font-bold text-slate-800">
                              {s.name}
                            </td>
                            {weekData.map((d) => {
                              if (d.isActive) {
                                const score = calculateScore(
                                  s.id,
                                  d.dateString,
                                );
                                totalPercent += score.percent;
                                activeDays += 1;
                                return (
                                  <td
                                    key={d.dateString}
                                    className="py-3 text-center"
                                  >
                                    <div className="text-xs font-bold text-slate-700">
                                      {score.percent}%
                                    </div>
                                  </td>
                                );
                              }
                              return (
                                <td
                                  key={d.dateString}
                                  className="py-3 text-center text-slate-300"
                                >
                                  -
                                </td>
                              );
                            })}
                            <td className="py-3 text-center font-black text-[#1356e2]">
                              {activeDays > 0
                                ? Math.round(totalPercent / activeDays)
                                : 0}
                              %
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB PROFIL & CARD SANTRI TERBARU (5 KOLOM + DATA DETAIL) */}
        {activeTab === "profil" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredSantri.map((s) => {
              const score = calculateScore(s.id);
              const santriAch = achievements.filter((a) =>
                a.santriIds.includes(s.id),
              );
              const santriVio = violations.filter((v) => v.santriId === s.id);

              const attCode = attendance[`${selectedDate}_${s.id}`] || "H";
              const attText =
                attCode === "H"
                  ? "Hadir"
                  : attCode === "I"
                    ? "Izin"
                    : attCode === "S"
                      ? "Sakit"
                      : "Alpha";
              const isHaid = !!haidStatus[`${selectedDate}_${s.id}`];
              const note =
                notes[`${selectedDate}_${s.id}`] ||
                "Alhamdulillah tidak ada catatan";

              return (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col h-auto min-h-[500px]"
                >
                  {/* Foto & Identitas */}
                  <div className="flex flex-col items-center text-center pb-3 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden mb-2">
                      <img
                        src={s.photo}
                        alt={s.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80";
                        }}
                      />
                    </div>
                    <h4 className="font-black text-slate-800 text-sm leading-tight line-clamp-2">
                      {s.name}
                    </h4>
                    <p className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full mt-1.5 mb-1">
                      {s.class}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                      NIS: {s.nis} | NISN: {s.nisn}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{s.ttl}</p>
                  </div>

                  {/* Keterangan Harian & Catatan */}
                  <div className="py-3 flex flex-col border-b border-slate-100 shrink-0">
                    <div className="flex gap-2 text-[10px] mb-2 justify-center">
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold ${attCode === "I" || attCode === "S" ? "bg-amber-100 text-amber-700" : attCode === "A" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}
                      >
                        {attText}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold ${isHaid ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {isHaid ? "Udzur" : "Suci"}
                      </span>
                    </div>
                    <div className="text-[10px] bg-slate-50 p-2 rounded-lg text-slate-600 italic text-center font-medium shadow-inner">
                      "{note}"
                    </div>
                  </div>

                  {/* Indikator Ceklis Detail (Hari Ini) */}
                  <div className="py-3 flex flex-col gap-2 border-b border-slate-100 shrink-0">
                    {/* Wajib */}
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {categories
                        .filter((c) => c.type === "wajib")
                        .map((c) => {
                          const isChecked =
                            records[`${selectedDate}_${s.id}_${c.id}`];
                          const isRestrictedHaid =
                            isHaid &&
                            (c.name.includes("Sholat") ||
                              c.name.includes("Puasa"));

                          let badgeClass = "";
                          if (attCode === "I" || attCode === "A") {
                            badgeClass =
                              "bg-slate-100 text-slate-400 font-medium border border-slate-200";
                          } else if (attCode === "S") {
                            badgeClass =
                              "bg-amber-50 text-amber-600 font-bold border border-amber-200";
                          } else if (isRestrictedHaid) {
                            badgeClass =
                              "bg-pink-50 text-pink-600 font-bold border border-pink-200";
                          } else if (isChecked) {
                            badgeClass =
                              "bg-blue-100 text-blue-700 font-bold border border-blue-200";
                          } else {
                            badgeClass =
                              "bg-slate-100 text-slate-400 font-medium border border-slate-200";
                          }

                          return (
                            <span
                              key={c.id}
                              className={`text-[9px] px-1.5 py-0.5 rounded shadow-sm ${badgeClass}`}
                            >
                              {c.name}
                            </span>
                          );
                        })}
                    </div>
                    {/* Sunnah */}
                    <div className="flex flex-wrap gap-1.5 justify-center mt-1">
                      {categories
                        .filter((c) => c.type === "sunnah")
                        .map((c) => {
                          const isChecked =
                            records[`${selectedDate}_${s.id}_${c.id}`];
                          const isAvailable = attCode === "H";
                          const showCheck = isAvailable && isChecked;

                          return (
                            <span
                              key={c.id}
                              className={`text-[9px] px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1 border ${showCheck ? "bg-emerald-50 text-emerald-700 font-bold border-emerald-200" : "bg-slate-100 text-slate-400 font-medium border-slate-200"}`}
                            >
                              <Star
                                className={`w-2.5 h-2.5 ${showCheck ? "fill-emerald-500 text-emerald-500" : "fill-slate-300 text-slate-300"}`}
                              />{" "}
                              {c.name}
                            </span>
                          );
                        })}
                    </div>
                  </div>

                  {/* List Portofolio */}
                  <div className="flex-1 overflow-y-auto space-y-2 py-3 pr-1 custom-scrollbar">
                    {santriAch.length > 0 && (
                      <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                        <p className="text-[10px] font-bold text-blue-800 uppercase mb-1.5 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" /> Prestasi
                        </p>
                        <ul className="text-[10px] text-slate-600 space-y-1.5 list-disc pl-3">
                          {santriAch.map((a) => (
                            <li key={a.id}>
                              <span className="font-semibold text-slate-700">
                                {a.title}
                              </span>{" "}
                              ({a.rank})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {santriVio.length > 0 && (
                      <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                        <p className="text-[10px] font-bold text-amber-800 uppercase mb-1.5 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Kedisiplinan
                        </p>
                        <ul className="text-[10px] text-slate-600 space-y-1.5 list-disc pl-3">
                          {santriVio.map((v) => (
                            <li key={v.id}>
                              <span className="font-semibold text-slate-700">
                                {v.description}
                              </span>{" "}
                              - <i>{v.sanction}</i>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {santriAch.length === 0 && santriVio.length === 0 && (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-[10px] text-slate-400 italic text-center">
                          Belum ada data portofolio tercatat.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tombol Akses Cepat */}
                  <a
                    href={`#/view/${s.id}`}
                    className="mt-3 w-full py-2.5 bg-slate-50 text-[#1356e2] hover:bg-[#1356e2] hover:text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1 transition-all border border-blue-100 shadow-sm"
                  >
                    Lihat Portofolio Lengkap{" "}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "prestasi" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#1356e2]" />{" "}
                {formAch.id ? "Edit Prestasi" : "Input Prestasi Baru"}
              </h3>
              <form
                onSubmit={saveAchievement}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Nama Perlombaan
                  </label>
                  <input
                    type="text"
                    value={formAch.title}
                    onChange={(e) =>
                      setFormAch({ ...formAch, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Capaian
                  </label>
                  <input
                    type="text"
                    value={formAch.rank}
                    onChange={(e) =>
                      setFormAch({ ...formAch, rank: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Tingkat
                  </label>
                  <input
                    type="text"
                    value={formAch.level}
                    onChange={(e) =>
                      setFormAch({ ...formAch, level: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Penyelenggara
                  </label>
                  <input
                    type="text"
                    value={formAch.organizer}
                    onChange={(e) =>
                      setFormAch({ ...formAch, organizer: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={formAch.date}
                    onChange={(e) =>
                      setFormAch({ ...formAch, date: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Field Link Dokumen */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Link Bukti/Dokumentasi (Opsional - URL Drive/Foto)
                  </label>
                  <input
                    type="text"
                    value={formAch.documentUrl}
                    onChange={(e) =>
                      setFormAch({ ...formAch, documentUrl: e.target.value })
                    }
                    placeholder="https://drive.google.com/... atau /dokumen/file.pdf"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-600 mb-2">
                    Santri yang Mengikuti
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {santriList.map((s) => {
                      const sel = formAch.santriIds.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            const updated = sel
                              ? formAch.santriIds.filter((id) => id !== s.id)
                              : [...formAch.santriIds, s.id];
                            setFormAch({ ...formAch, santriIds: updated });
                          }}
                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${sel ? "bg-[#1356e2] text-white" : "bg-slate-100 text-slate-600"}`}
                        >
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="md:col-span-3 flex gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#1356e2] text-white font-bold text-xs"
                  >
                    Simpan Data
                  </button>
                  {formAch.id && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormAch({
                          id: null,
                          title: "",
                          rank: "",
                          type: "",
                          level: "",
                          organizer: "",
                          date: "",
                          documentUrl: "",
                          santriIds: [],
                        })
                      }
                      className="px-6 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">
                Daftar Prestasi (Klik untuk detail)
              </h3>
              <div className="divide-y divide-slate-100">
                {achievements.map((a) => (
                  <div
                    key={a.id}
                    className="py-3 flex justify-between items-center group"
                  >
                    <button
                      onClick={() => setSelectedAch(a)}
                      className="text-left flex-1 cursor-pointer"
                    >
                      <h4 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">
                        {a.title}{" "}
                        <span className="bg-[#f0b732] text-white px-1.5 py-0.5 rounded text-[10px] ml-2">
                          {a.rank}
                        </span>
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {a.level} - {a.organizer} ({a.date})
                      </p>
                      <p className="text-[10px] text-blue-600 font-medium mt-1">
                        {a.santriIds
                          .map(
                            (id) => santriList.find((s) => s.id === id)?.name,
                          )
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFormAch(a)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAchievement(a.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "pelanggaran" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />{" "}
                {formVio.id ? "Edit Pelanggaran" : "Catat Pelanggaran"}
              </h3>
              <form
                onSubmit={saveViolation}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Pilih Santri
                  </label>
                  <select
                    value={formVio.santriId}
                    onChange={(e) =>
                      setFormVio({ ...formVio, santriId: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="">-- Pilih --</option>
                    {santriList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.class})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Tingkat
                  </label>
                  <select
                    value={formVio.level}
                    onChange={(e) =>
                      setFormVio({ ...formVio, level: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                  >
                    <option>Ringan</option>
                    <option>Sedang</option>
                    <option>Berat</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Deskripsi
                  </label>
                  <input
                    type="text"
                    value={formVio.description}
                    onChange={(e) =>
                      setFormVio({ ...formVio, description: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Sanksi
                  </label>
                  <input
                    type="text"
                    value={formVio.sanction}
                    onChange={(e) =>
                      setFormVio({ ...formVio, sanction: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={formVio.date}
                    onChange={(e) =>
                      setFormVio({ ...formVio, date: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs"
                  >
                    Simpan Catatan
                  </button>
                  {formVio.id && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormVio({
                          id: null,
                          santriId: "",
                          level: "Ringan",
                          description: "",
                          sanction: "",
                          date: "",
                        })
                      }
                      className="px-6 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">
                Riwayat Pelanggaran
              </h3>
              <div className="divide-y divide-slate-100">
                {violations.map((v) => {
                  const s = santriList.find((x) => x.id === v.santriId);
                  return (
                    <div
                      key={v.id}
                      className="py-3 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">
                          {s?.name}{" "}
                          <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[10px] ml-2">
                            Tingkat {v.level}
                          </span>
                        </h4>
                        <p className="text-[10px] text-slate-700 mt-0.5">
                          {v.description}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          Sanksi: {v.sanction} ({v.date})
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setFormVio(v)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteViolation(v.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB PENGATURAN (Edit Data Foto & PIN) */}
        {activeTab === "pengaturan" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm max-w-xl space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#1356e2]" /> Tambah Santri
                Baru
              </h3>
              <form onSubmit={addSantri} className="space-y-3">
                <input
                  type="text"
                  value={formSantri.name}
                  onChange={(e) =>
                    setFormSantri({ ...formSantri, name: e.target.value })
                  }
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
                <select
                  value={formSantri.class}
                  onChange={(e) =>
                    setFormSantri({ ...formSantri, class: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                >
                  <option>IX - Chechnya</option>
                  <option>IX - Yordan</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formSantri.nis}
                    onChange={(e) =>
                      setFormSantri({ ...formSantri, nis: e.target.value })
                    }
                    placeholder="NIS Santri"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={formSantri.nisn}
                    onChange={(e) =>
                      setFormSantri({ ...formSantri, nisn: e.target.value })
                    }
                    placeholder="NISN"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formSantri.ttl}
                    onChange={(e) =>
                      setFormSantri({ ...formSantri, ttl: e.target.value })
                    }
                    placeholder="Tempat, Tanggal Lahir"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={formSantri.pin}
                    onChange={(e) =>
                      setFormSantri({ ...formSantri, pin: e.target.value })
                    }
                    placeholder="PIN Portal (Kosongkan = NIS)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#1356e2] text-white font-bold text-xs"
                >
                  Simpan Santri
                </button>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#1356e2]" /> Kelola Data &
                Keamanan Santri
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase">
                      <th className="p-3 rounded-tl-xl">Foto</th>
                      <th className="p-3">Nama Santri</th>
                      <th className="p-3">Link Foto</th>
                      <th className="p-3">PIN Portal</th>
                      <th className="p-3 text-right rounded-tr-xl">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {santriList.map((s) => {
                      const displayPin = s.pin || s.nis;
                      return (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3">
                            <img
                              src={s.photo}
                              alt=""
                              className="w-10 h-10 rounded-full object-cover border border-slate-200"
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80";
                              }}
                            />
                          </td>
                          <td className="p-3 font-bold text-slate-800">
                            {s.name}{" "}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {s.class}
                            </span>
                          </td>

                          {/* Edit Mode vs View Mode */}
                          <td className="p-3">
                            {editSantriId === s.id ? (
                              <input
                                type="text"
                                value={editForm.photo}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    photo: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                                placeholder="/photos/nama.jpg"
                              />
                            ) : (
                              <span
                                className="text-xs text-slate-500 truncate max-w-[150px] block"
                                title={s.photo}
                              >
                                {s.photo}
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            {editSantriId === s.id ? (
                              <input
                                type="text"
                                value={editForm.pin}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    pin: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                                placeholder="Ketik PIN Baru"
                              />
                            ) : (
                              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                                {displayPin}
                              </span>
                            )}
                          </td>

                          <td className="p-3 text-right">
                            {editSantriId === s.id ? (
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => saveSantriDataUpdate(s.id)}
                                  className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600"
                                >
                                  Simpan
                                </button>
                                <button
                                  onClick={() => setEditSantriId(null)}
                                  className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-300"
                                >
                                  Batal
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setEditSantriId(s.id);
                                    setEditForm({
                                      photo: s.photo,
                                      pin: displayPin,
                                    });
                                  }}
                                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                                  title="Edit Data"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteSantri(s.id)}
                                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                                  title="Hapus Santri"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL WHATSAPP */}
      {modalWA.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800 text-base">
                Format Laporan WhatsApp
              </h4>
              <button
                onClick={() =>
                  setModalWA({ open: false, santriName: "", text: "" })
                }
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <textarea
              rows={12}
              value={modalWA.text}
              onChange={(e) => setModalWA({ ...modalWA, text: e.target.value })}
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-600"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Tersalin!" : "Salin Pesan WA"}
              </button>
              <button
                onClick={() =>
                  setModalWA({ open: false, santriName: "", text: "" })
                }
                className="px-4 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POP-UP PRESTASI ADMIN */}
      {selectedAch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedAch(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-800 leading-tight">
                {selectedAch.title}
              </h3>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-[#f0b732] text-white uppercase tracking-wide">
                {selectedAch.rank}
              </span>
            </div>

            <div className="space-y-3 text-sm border-t border-b border-slate-100 py-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Tingkat:</span>{" "}
                <span className="font-bold text-slate-800">
                  {selectedAch.level}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Penyelenggara:</span>{" "}
                <span className="font-bold text-slate-800 text-right">
                  {selectedAch.organizer}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal:</span>{" "}
                <span className="font-bold text-slate-800">
                  {selectedAch.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kategori:</span>{" "}
                <span className="font-bold text-slate-800">
                  {selectedAch.type}
                </span>
              </div>
            </div>

            {selectedAch.documentUrl ? (
              <a
                href={selectedAch.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white font-bold rounded-xl shadow-sm transition-all flex justify-center items-center gap-2"
              >
                <FileText className="w-4 h-4" /> Buka Lampiran Dokumen/Foto
              </a>
            ) : (
              <div className="w-full py-3 text-center bg-slate-50 border border-slate-100 rounded-xl text-slate-400 text-xs italic">
                Tidak ada lampiran dokumen/foto.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
