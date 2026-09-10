export interface DriverProfile {
  nameMarathi: string;
  nameEnglish: string;
  driverId: string;
  permitNumber: string;
  vehicleTypeMarathi: string;
  vehicleTypeEnglish: string;
  rtoMarathi: string;
  rtoEnglish: string;
  validityDateMarathi: string;
  validityDateEnglish: string;
  dateOfBirthMarathi: string;
  dateOfBirthEnglish: string;
  cardNumber: string;
  issueDateMarathi: string;
  issueDateEnglish: string;
  renewalDateMarathi: string;
  renewalDateEnglish: string;
  aadhaarMasked: string;
  verificationStatus: 'VERIFIED' | 'ACTIVE';
  verificationId: string;
  commercialCategory: string;
  plateColor: string;
  boardNameMarathi: string;
  boardNameEnglish: string;
  mottoMarathi: string;
  mottoEnglish: string;
  quoteMarathi: string;
  quoteAuthor: string;
  sloganMarathi: string;
  driverPhotoUrl: string;
  anandDighePhotoUrl: string;
  signatureText: string;
}

export const DEMO_DRIVER_DATA: DriverProfile = {
  nameMarathi: 'संजय तुकाराम पाटील',
  nameEnglish: 'Sanjay Tukaram Patil',
  driverId: 'MHDPWB001234',
  permitNumber: 'MH12 20180001234',
  vehicleTypeMarathi: 'ऑटो-रिक्षा / टॅक्सी',
  vehicleTypeEnglish: 'Auto-Rickshaw / Taxi',
  rtoMarathi: 'पुणे (MH12)',
  rtoEnglish: 'Pune (MH12)',
  validityDateMarathi: '31 डिसेंबर 2028',
  validityDateEnglish: '31 December 2028',
  dateOfBirthMarathi: '15 जून 1990',
  dateOfBirthEnglish: '15 June 1990',
  cardNumber: 'MHDPWB25000123',
  issueDateMarathi: '01 जून 2024',
  issueDateEnglish: '01 June 2024',
  renewalDateMarathi: '31 डिसेंबर 2028',
  renewalDateEnglish: '31 December 2028',
  aadhaarMasked: '**** **** 6789',
  verificationStatus: 'VERIFIED',
  verificationId: 'MHDPWB25000123',
  commercialCategory: 'Commercial / Yellow Number Plate (व्यावसायिक पिवळी पाटी)',
  plateColor: 'Yellow / पिवळी',
  boardNameMarathi: 'धर्मवीर आनंद दिघे साहेब महाराष्ट्र प्रवासी वाहन चालक कल्याण मंडळ',
  boardNameEnglish: 'Dharmaveer Anand Dighe Saheb Maharashtra Passenger Vehicle Driver Welfare Board',
  mottoMarathi: 'सुरक्षित प्रवास, समृद्ध महाराष्ट्र',
  mottoEnglish: 'Safe Travel, Prosperous Maharashtra',
  quoteMarathi: 'एक चालक, असंख्य प्रवाशांचा विश्वास, हाच महाराष्ट्राचा विकास.',
  quoteAuthor: 'धर्मवीर आनंद दिघे साहेब',
  sloganMarathi: 'माणूस रस्ते जोडतो, महाराष्ट्र पुढे नेतो',
  driverPhotoUrl: './assets/driver-photo.jpg',
  anandDighePhotoUrl: './assets/anand-dighe.png',
  signatureText: 'S. Patil',
};

export interface WelfareScheme {
  id: string;
  titleMarathi: string;
  titleEnglish: string;
  descriptionMarathi: string;
  descriptionEnglish: string;
  category: string;
  iconName: string;
  badgeMarathi: string;
}

export const WELFARE_SCHEMES: WelfareScheme[] = [
  {
    id: 'scheme-1',
    titleMarathi: 'प्रवासी वाहन चालक कल्याणकारी योजना',
    titleEnglish: 'Commercial Driver Welfare & Insurance Scheme',
    descriptionMarathi: 'चालकांसाठी अपघाती विमा संरक्षण, वैद्यकीय सहाय्य व पेन्शन सहाय्य योजनांचा लाभ.',
    descriptionEnglish: 'Accidental insurance coverage, medical emergency assistance, and welfare support for registered drivers.',
    category: 'कल्याणकारी सहाय्य',
    iconName: 'ShieldCheck',
    badgeMarathi: 'सक्रिय लाभ',
  },
  {
    id: 'scheme-2',
    titleMarathi: 'रस्ता सुरक्षा व प्रगत कौशल्य प्रशिक्षण',
    titleEnglish: 'Road Safety & Defensive Driving Training',
    descriptionMarathi: 'प्रवाशांच्या सुरक्षेसाठी आधुनिक नियम, प्राथमिक उपचार व ई-वाहन तंत्रज्ञान प्रशिक्षण कार्यशाळा.',
    descriptionEnglish: 'Regular safety workshops, passenger etiquette, first aid training, and electric vehicle orientation.',
    category: 'सुरक्षा उपक्रम',
    iconName: 'Award',
    badgeMarathi: 'प्रमाणित प्रशिक्षण',
  },
  {
    id: 'scheme-3',
    titleMarathi: 'डिजिटल आरटीओ व स्मार्ट परवाना सेवा',
    titleEnglish: 'Fast-Track Digital RTO & Permit Renewal',
    descriptionMarathi: 'क्यूआर ओळखपत्राद्वारे थेट ऑनलाइन परवाना नूतनीकरण, कर भरणा व त्वरित तक्रार निवारण कक्ष.',
    descriptionEnglish: 'Paperless permit verification, single-window tax assistance, and digital grievance redressal portal.',
    category: 'डिजिटल सेवा',
    iconName: 'Smartphone',
    badgeMarathi: 'डिजिटल सुलभता',
  },
];
