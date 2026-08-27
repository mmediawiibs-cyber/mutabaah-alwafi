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
  },
  {
    id: "nama_santri_2",
    name: "ASHA NABILA SAIFUDIN",
    class: "IX - Chechnya",
    ttl: "Jakarta, 19 April 2012",
    nis: "242507018",
    nisn: "0125735361",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_3",
    name: "AZKIA SAKHI",
    class: "IX - Chechnya",
    ttl: "Jakarta, 05 December 2011",
    nis: "242507021",
    nisn: "0112097503",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_4",
    name: "KHANSA ZAFIRAH BASKORO",
    class: "IX - Chechnya",
    ttl: "Jakarta, 17 August 2011",
    nis: "242507038",
    nisn: "0119505547",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_5",
    name: "KIARA AMINA",
    class: "IX - Chechnya",
    ttl: "Jakarta, 01 December 2011",
    nis: "242507039",
    nisn: "0114771974",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_6",
    name: "MALIKA LATHIFA",
    class: "IX - Chechnya",
    ttl: "Bogor, 09 July 2012",
    nis: "242507042",
    nisn: "0126745351",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_7",
    name: "MALIKA SHEREEN",
    class: "IX - Chechnya",
    ttl: "Denpasar, 12 May 2012",
    nis: "242507043",
    nisn: "0123391968",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_8",
    name: "MARIYAH RUMAISHA KANATA",
    class: "IX - Chechnya",
    ttl: "Bandung, 30 June 2012",
    nis: "242507044",
    nisn: "0122609680",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_9",
    name: "NABILAH ABIDAH FARAHANI",
    class: "IX - Chechnya",
    ttl: "N/A, 26 March 2012",
    nis: "242507060",
    nisn: "0122194176",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_10",
    name: "NAYA FEBRIA AZMI",
    class: "IX - Chechnya",
    ttl: "Jakarta, 10 February 2012",
    nis: "242507062",
    nisn: "0121685168",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_11",
    name: "SYAKIRA HUSNAYA",
    class: "IX - Chechnya",
    ttl: "Jakarta, 09 June 2012",
    nis: "242507082",
    nisn: "3128481787",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_12",
    name: "SYARIFAH NABILA AZZAHRA WAHYUDI",
    class: "IX - Chechnya",
    ttl: "Bogor, 28 March 2012",
    nis: "242507083",
    nisn: "0126182252",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_13",
    name: "YASYFA AMIRIA AKBAR",
    class: "IX - Chechnya",
    ttl: "Tangerang Selatan, 07 July 2012",
    nis: "242507088",
    nisn: "0126222171",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_14",
    name: "YUMNA ZUMARNIS",
    class: "IX - Chechnya",
    ttl: "Jakarta, 10 November 2011",
    nis: "242507089",
    nisn: "3115533551",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_15",
    name: "HALWA AZZAINA AQILAH",
    class: "IX - Chechnya",
    ttl: "N/A",
    nis: "252608114",
    nisn: "N/A",
    photo: "/photos/default.jpg",
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
  },
  {
    id: "nama_santri_17",
    name: "AISYAH KHADIJAH RABBANI",
    class: "IX - Yordan",
    ttl: "N/A",
    nis: "242507097",
    nisn: "0111507273",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_18",
    name: "AISYAH ZAHROTUL FADHILAH",
    class: "IX - Yordan",
    ttl: "Bekasi, 07 December 2011",
    nis: "242507008",
    nisn: "117456013",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_19",
    name: "ALIYA TASNIM",
    class: "IX - Yordan",
    ttl: "N/A, 24 September 2011",
    nis: "242507012",
    nisn: "0112339380",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_20",
    name: "FATHIYYAH WIDYANDRA",
    class: "IX - Yordan",
    ttl: "N/A, 24 December 2011",
    nis: "242507029",
    nisn: "0116613525",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_21",
    name: "JANETHA RAINY WANG",
    class: "IX - Yordan",
    ttl: "Tangerang, 03 November 2011",
    nis: "242507035",
    nisn: "0112553340",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_22",
    name: "KAILA KIRANA MARUKHI",
    class: "IX - Yordan",
    ttl: "Jakarta, 07 January 2012",
    nis: "242507037",
    nisn: "0128500013",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_23",
    name: "MALIKA DYANDRA RUBINA",
    class: "IX - Yordan",
    ttl: "Jakarta, 20 July 2012",
    nis: "242507041",
    nisn: "3118625060",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_24",
    name: "MEDINA RAISA SHALIHA",
    class: "IX - Yordan",
    ttl: "Makasar, 26 May 2012",
    nis: "242507045",
    nisn: "122533021",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_25",
    name: "NAFEEZA ZHAHIRAH RAISA RAHMAN",
    class: "IX - Yordan",
    ttl: "Bandung, 12 April 2012",
    nis: "242507061",
    nisn: "126639709",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_26",
    name: "PUTRI RAISYAH WICAKSONO",
    class: "IX - Yordan",
    ttl: "N/A",
    nis: "242507064",
    nisn: "0127633617",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_27",
    name: "QONITA AZ-ZAHRA",
    class: "IX - Yordan",
    ttl: "Bogor, 17 October 2012",
    nis: "242507065",
    nisn: "0121599305",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_28",
    name: "RAIHANA AYSHA HUSNI",
    class: "IX - Yordan",
    ttl: "N/A, 03 January 2012",
    nis: "242507071",
    nisn: "N/A",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_29",
    name: "SHAKILA HUMAIRA ASH SHAFIYA",
    class: "IX - Yordan",
    ttl: "Jakarta, 09 June 2012",
    nis: "242507079",
    nisn: "0113555768",
    photo: "/photos/default.jpg",
  },
  {
    id: "nama_santri_30",
    name: "TARISA NURUL ILMA",
    class: "IX - Yordan",
    ttl: "N/A, 30 October 2011",
    nis: "242507085",
    nisn: "3118625060",
    photo: "/photos/default.jpg",
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

  const [formSantri, setFormSantri] = useState({
    name: "",
    class: "IX - Chechnya",
    nis: "",
    nisn: "",
    ttl: "",
  });
  const [formAch, setFormAch] = useState({
    id: null,
    title: "",
    rank: "Juara 1",
    type: "Single",
    level: "Internal Sekolah",
    organizer: "",
    date: "",
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
  const [editPhotoId, setEditPhotoId] = useState(null);
  const [editPhotoUrl, setEditPhotoUrl] = useState("");

  // Keypass State
  const [isPortalAuth, setIsPortalAuth] = useState(false);
  const [portalPin, setPortalPin] = useState("");
  const [portalError, setPortalError] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#/view/")) {
        const sid = hash.replace("#/view/", "");
        setPublicSantriId(sid);
        if (localStorage.getItem(`auth_santri_${sid}`) === "true") {
          setIsPortalAuth(true);
        } else {
          setIsPortalAuth(false);
        }
      } else {
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

  const handlePortalLogin = (e, correctNis) => {
    e.preventDefault();
    if (portalPin === correctNis) {
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
      categories.forEach((c) => {
        const key = `${selectedDate}_${s.id}_${c.id}`;
        updated[key] = true;
      });
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

  // Fungsi generate WA Individu
  const openWAModal = (santri) => {
    const isHaid = !!haidStatus[`${selectedDate}_${santri.id}`];
    const attCode = attendance[`${selectedDate}_${santri.id}`] || "H";
    const note = notes[`${selectedDate}_${santri.id}`] || "-";

    let summaryList = categories
      .map((c) => {
        const isRestricted =
          isHaid && (c.name.includes("Sholat") || c.name.includes("Puasa"));
        const isChecked = isRestricted
          ? "Udzur Syar'i (Haid)"
          : records[`${selectedDate}_${santri.id}_${c.id}`]
            ? "Terlaksana"
            : "Belum";
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

  // Fungsi generate WA Grup (Baru)
  const openWAGroupModal = () => {
    let text = `Bismillah, Assalamu'alaikum Ummu.\n\nAlhamdulillah, data mutabaah dan laporan pekanan ananda sudah selesai. Ummu dapat mengunjungi portofolio ananda melalui tautan di bawah ini:\n\n`;

    filteredSantri.forEach((s, idx) => {
      text += `${idx + 1}. Ananda *${s.name}*\n   Akses di: https://${window.location.host}/#/view/${s.id}\n\n`;
    });

    text += `Catatan: Gunakan Nomor Induk Santri (NIS) ananda sebagai PIN untuk membuka gembok portofolio.\n\nJazakunnallahu khairan atas kerja sama Ummu dalam memantau perkembangan ananda. Semoga ananda senantiasa diberikan keistiqamahan.\nBarakallahu fiikum.`;

    setModalWA({ open: true, santriName: `Grup ${selectedClass}`, text: text });
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
    const newS = {
      ...formSantri,
      id: `santri_${Date.now()}`,
      photo: `/photos/default.jpg`,
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
    });
  };

  const savePhotoUpdate = (santriId) => {
    const updated = santriList.map((s) =>
      s.id === santriId ? { ...s, photo: editPhotoUrl } : s,
    );
    setSantriList(updated);
    saveToFirebase("santri", updated);
    setEditPhotoId(null);
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

  const calculateScore = (santriId, targetDate = selectedDate) => {
    const isHaid = !!haidStatus[`${targetDate}_${santriId}`];
    const wajibCats = categories.filter((c) => c.type === "wajib");
    let completedWajib = 0;

    wajibCats.forEach((c) => {
      if (isHaid && (c.name.includes("Sholat") || c.name.includes("Puasa"))) {
        completedWajib += 1;
      } else if (records[`${targetDate}_${santriId}_${c.id}`]) {
        completedWajib += 1;
      }
    });

    const percent = wajibCats.length
      ? Math.round((completedWajib / wajibCats.length) * 100)
      : 0;

    let stars = 0;
    const sunnahCats = categories.filter((c) => c.type === "sunnah");
    sunnahCats.forEach((c) => {
      if (records[`${targetDate}_${santriId}_${c.id}`]) stars += 1;
    });

    return { percent, stars, isHaid, sunnahTotal: sunnahCats.length };
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

  // ---- RENDER PORTAL WALI SANTRI ----
  if (publicSantriId) {
    const santri =
      santriList.find((s) => s.id === publicSantriId) || INITIAL_SANTRI[0];

    // RENDER LOCK SCREEN JIKA BELUM AUTH
    if (!isPortalAuth) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-slate-200">
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
              onSubmit={(e) => handlePortalLogin(e, santri.nis)}
              className="space-y-4"
            >
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="Masukkan NIS Ananda..."
                  value={portalPin}
                  onChange={(e) => setPortalPin(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-center font-bold tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-[#1356e2] focus:border-transparent transition-all"
                />
              </div>
              {portalError && (
                <p className="text-xs text-red-500 font-bold bg-red-50 py-2 rounded-lg border border-red-100">
                  NIS tidak sesuai. Silakan periksa kembali.
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

    // RENDER PORTAL UTAMA JIKA SUDAH AUTH
    const santriAch = achievements.filter((a) =>
      a.santriIds.includes(santri.id),
    );
    const santriVio = violations.filter((v) => v.santriId === santri.id);

    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* TOMBOL LOGOUT PORTAL */}
          <div className="flex justify-end">
            <button
              onClick={handlePortalLogout}
              className="flex items-center gap-2 text-xs font-bold text-red-500 bg-white shadow-sm px-4 py-2 rounded-xl border border-red-100 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4" /> Kunci Layar (Keluar)
            </button>
          </div>

          {/* HEADER PORTAL */}
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
                  <User className="w-3 h-3" /> Portal Wali Santri
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

          {/* DETAIL CEKLIS HARIAN */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((c) => {
                const isHaid = !!haidStatus[`${selectedDate}_${santri.id}`];
                const isRestricted =
                  isHaid &&
                  (c.name.includes("Sholat") || c.name.includes("Puasa"));
                const isChecked =
                  records[`${selectedDate}_${santri.id}_${c.id}`];

                let statusText = "Belum Terlaksana";
                let statusColor = "text-rose-600 bg-rose-50 border-rose-100";

                if (isRestricted) {
                  statusText = "Udzur Syar'i (Haid)";
                  statusColor = "text-pink-600 bg-pink-50 border-pink-100";
                } else if (isChecked) {
                  statusText = "Terlaksana";
                  statusColor =
                    "text-emerald-600 bg-emerald-50 border-emerald-100";
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

            {notes[`${selectedDate}_${santri.id}`] && (
              <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm">
                <span className="font-bold text-blue-800 block mb-1">
                  Catatan Walas:
                </span>
                <span className="text-blue-900 leading-relaxed">
                  {notes[`${selectedDate}_${santri.id}`]}
                </span>
              </div>
            )}
          </div>

          {/* REKAP PEKAN INI */}
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
                    let completedWajib = 0;
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

                    return (
                      <tr key={d.dateString} className="hover:bg-slate-50">
                        <td className="py-3 px-2 font-semibold text-slate-700">
                          {d.dayName}, {d.label}
                          {isHaid && (
                            <span className="text-[10px] bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded ml-2">
                              Udzur
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
                    <div
                      key={a.id}
                      className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-blue-900 text-sm">
                          {a.title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f0b732] text-white">
                          {a.rank}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {a.level} • {a.organizer}
                      </p>
                    </div>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex items-center justify-center p-4">
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
              <MessageCircle className="w-4 h-4" /> Kirim WA Grup
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
                {/* KALENDER */}
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

                {/* TOGGLE HARIAN/PEKANAN (Dipindah ke samping kalender) */}
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

              {/* ACTION BUTTONS */}
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
                        const isHaid = !!haidStatus[`${selectedDate}_${s.id}`];
                        const att =
                          attendance[`${selectedDate}_${s.id}`] || "H";
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
                              const isRestricted =
                                isHaid &&
                                (c.name.includes("Sholat") ||
                                  c.name.includes("Puasa"));
                              return (
                                <td
                                  key={c.id}
                                  className="py-3 px-2 text-center"
                                >
                                  {isRestricted ? (
                                    <span className="text-[10px] font-bold text-pink-400">
                                      -
                                    </span>
                                  ) : (
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
                                  )}
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

        {activeTab === "profil" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredSantri.map((s) => {
              const score = calculateScore(s.id);
              const santriAch = achievements.filter((a) =>
                a.santriIds.includes(s.id),
              );
              const santriVio = violations.filter((v) => v.santriId === s.id);

              return (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col h-[380px]"
                >
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
                    <p className="text-[10px] text-slate-400 mt-1">{s.class}</p>
                  </div>

                  <div className="py-3 flex-shrink-0">
                    <div className="flex justify-between items-center text-[10px] mb-1">
                      <span className="font-semibold text-slate-500">
                        Kewajiban
                      </span>
                      <span className="font-black text-blue-600">
                        {score.percent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${score.percent}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] mt-2">
                      <span className="font-semibold text-slate-500">
                        Ibadah Sunnah
                      </span>
                      <div className="font-bold text-emerald-600">
                        {score.stars} / {score.sunnahTotal} Tuntas
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {santriAch.length > 0 && (
                      <div className="bg-blue-50/50 p-2 rounded-xl border border-blue-100">
                        <p className="text-[9px] font-bold text-blue-800 uppercase mb-1 flex items-center gap-1">
                          <Award className="w-3 h-3" /> Prestasi
                        </p>
                        <ul className="text-[10px] text-slate-600 space-y-1 list-disc pl-3">
                          {santriAch.map((a) => (
                            <li key={a.id}>
                              {a.title} ({a.rank})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {santriVio.length > 0 && (
                      <div className="bg-amber-50/50 p-2 rounded-xl border border-amber-100">
                        <p className="text-[9px] font-bold text-amber-800 uppercase mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Pelanggaran
                        </p>
                        <ul className="text-[10px] text-slate-600 space-y-1 list-disc pl-3">
                          {santriVio.map((v) => (
                            <li key={v.id}>
                              {v.description} - <i>{v.sanction}</i>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {santriAch.length === 0 && santriVio.length === 0 && (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-[10px] text-slate-400 italic text-center">
                          Belum ada portofolio tercatat.
                        </p>
                      </div>
                    )}
                  </div>
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
              <h3 className="font-bold text-slate-800 mb-4">Daftar Prestasi</h3>
              <div className="divide-y divide-slate-100">
                {achievements.map((a) => (
                  <div
                    key={a.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">
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
                    </div>
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
                    placeholder="NIS (Digunakan sbg PIN)"
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
                <input
                  type="text"
                  value={formSantri.ttl}
                  onChange={(e) =>
                    setFormSantri({ ...formSantri, ttl: e.target.value })
                  }
                  placeholder="Tempat, Tanggal Lahir"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
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
                <User className="w-5 h-5 text-[#1356e2]" /> Kelola Data & Foto
                Santri
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase">
                      <th className="p-3 rounded-tl-xl">Foto</th>
                      <th className="p-3">Nama Santri</th>
                      <th className="p-3">Link Foto (URL / Folder)</th>
                      <th className="p-3 text-right rounded-tr-xl">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {santriList.map((s) => (
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
                        <td className="p-3">
                          {editPhotoId === s.id ? (
                            <input
                              type="text"
                              value={editPhotoUrl}
                              onChange={(e) => setEditPhotoUrl(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                              placeholder="/photos/nama.jpg atau https://..."
                            />
                          ) : (
                            <span
                              className="text-xs text-slate-500 truncate max-w-[200px] block"
                              title={s.photo}
                            >
                              {s.photo}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          {editPhotoId === s.id ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => savePhotoUpdate(s.id)}
                                className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600"
                              >
                                Simpan
                              </button>
                              <button
                                onClick={() => setEditPhotoId(null)}
                                className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-300"
                              >
                                Batal
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditPhotoId(s.id);
                                  setEditPhotoUrl(s.photo);
                                }}
                                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                                title="Edit Foto"
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
                    ))}
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
    </div>
  );
}
