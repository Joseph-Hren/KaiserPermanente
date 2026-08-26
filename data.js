export const ACTIVITY_CARDS = [
  { text: 'Your claim from 6/14/2026 has a $71.00 balance due.', linkText: 'View claim details' },
  { text: 'Your claim from 7/12/2026 is being reviewed by Kaiser.', linkText: 'View claim details' },
  { text: 'Your claim from 5/14/2026 was denied.', linkText: 'View claim details' },
  { text: 'Your Explanation of Benefits for June 2026 is now available.', linkText: 'View EOB' },
  { text: 'Your claim from 6/28/2026 is being reviewed by Kaiser.', linkText: 'View claim details' },
  { text: 'Your claim from 4/2/2026 was denied.', linkText: 'View claim details' },
  { text: 'Your claim from 4/30/2026 was approved. No balance due.', linkText: 'View claim details' },
  { text: 'Your deductible progress: you have met $750 of your $2,000 deductible.', linkText: 'View coverage details' },
  { text: 'Your Explanation of Benefits for April 2026 is now available.', linkText: 'View EOB' },
  { text: 'Your claim from 3/19/2026 was approved. No balance due.', linkText: 'View claim details' },
  { text: 'Your claim from 2/5/2026 was approved. No balance due.', linkText: 'View claim details' },
];

export const CLAIMS = [
  {
    id: 1,
    primaryBadge: 'pending', secondaryBadge: null,
    yourShare: 'Pending amount', serviceDate: '7/12/2026',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4829301',
    careReceived: ['Acupuncture – 60 min', 'Moxibustion Therapy'],
    services: [
      { name: 'Acupuncture – 60 min',  total: '$125.00', planRate: null, paidByKaiser: null, patientTotal: null, notes: 'Monthly acupuncture session. Claim under review.' },
      { name: 'Moxibustion Therapy',   total: '$65.00',  planRate: null, paidByKaiser: null, patientTotal: null, notes: 'Complementary heat therapy. Claim under review.' }
    ],
    summary: { totalCharged: '$190.00', planRate: null, appliedToDeductible: null, yourTotal: null }
  },
  {
    id: 2,
    primaryBadge: 'pending', secondaryBadge: null,
    yourShare: 'Pending amount', serviceDate: '6/28/2026',
    provider: 'Dr. Sarah Chen, MD', claimNumber: '4817652',
    careReceived: ['Office Visit – Hypertension Follow-up', 'Blood Pressure Monitoring'],
    services: [
      { name: 'Office Visit – Hypertension Follow-up', total: '$185.00', planRate: null, paidByKaiser: null, patientTotal: null, notes: 'Follow-up for hypertension management and medication review. Claim under review.' },
      { name: 'Blood Pressure Monitoring',             total: '$45.00',  planRate: null, paidByKaiser: null, patientTotal: null, notes: 'Ambulatory blood pressure monitoring. Claim under review.' }
    ],
    summary: { totalCharged: '$230.00', planRate: null, appliedToDeductible: null, yourTotal: null }
  },
  {
    id: 3,
    primaryBadge: 'approved', secondaryBadge: 'needs-payment',
    yourShare: '$71.00', serviceDate: '6/14/2026',
    provider: 'Kaiser Permanente Laboratory', claimNumber: '4804923',
    careReceived: ['Laboratory – A1C Blood Panel', 'Fasting Glucose Test', 'Complete Blood Count (CBC)', 'Urinalysis'],
    services: [
      { name: 'Laboratory – A1C Blood Panel',  total: '$85.00', planRate: '$35.00', paidByKaiser: '$0.00', patientTotal: '$35.00', notes: 'A1C test to monitor blood sugar levels over the past 3 months. Applied to deductible at plan rate.' },
      { name: 'Fasting Glucose Test',          total: '$55.00', planRate: '$20.00', paidByKaiser: '$0.00', patientTotal: '$20.00', notes: 'Fasting blood glucose measurement for pre-diabetes monitoring. Applied to deductible at plan rate.' },
      { name: 'Complete Blood Count (CBC)',     total: '$45.00', planRate: '$10.00', paidByKaiser: '$0.00', patientTotal: '$10.00', notes: 'Comprehensive blood cell count panel. Applied to deductible at plan rate.' },
      { name: 'Urinalysis',                    total: '$30.00', planRate: '$6.00',  paidByKaiser: '$0.00', patientTotal: '$6.00',  notes: 'Routine urinalysis for kidney and metabolic function. Applied to deductible at plan rate.' }
    ],
    summary: { totalCharged: '$215.00', planRate: '$71.00', appliedToDeductible: '$71.00', yourTotal: '$71.00' }
  },
  {
    id: 4,
    primaryBadge: 'pending', secondaryBadge: null,
    yourShare: 'Pending amount', serviceDate: '5/28/2026',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4791344',
    careReceived: ['Acupuncture – 60 min'],
    services: [
      { name: 'Acupuncture – 60 min', total: '$125.00', planRate: null, paidByKaiser: null, patientTotal: null, notes: 'Bi-monthly acupuncture session for chronic pain management. Claim under review.' }
    ],
    summary: { totalCharged: '$125.00', planRate: null, appliedToDeductible: null, yourTotal: null }
  },
  {
    id: 5,
    primaryBadge: 'denied', secondaryBadge: 'needs-payment',
    yourShare: '$215.00', serviceDate: '5/14/2026',
    provider: 'Dr. Jennifer Park, RD', claimNumber: '4778561',
    careReceived: ['Registered Dietitian Consultation', 'Individualized Meal Planning', 'Nutrition Assessment', 'Behavior Modification Counseling', 'Meal Planning Resources'],
    services: [
      { name: 'Registered Dietitian Consultation', total: '$165.00', planRate: '$65.00', paidByKaiser: '$0.00', patientTotal: '$65.00', notes: 'Claim denied: nutritional counseling requires a qualifying diagnosis referral. You are responsible for the billed amount at plan rate.' },
      { name: 'Individualized Meal Planning',      total: '$120.00', planRate: '$55.00', paidByKaiser: '$0.00', patientTotal: '$55.00', notes: 'Claim denied: this service is not covered without prior authorization. You are responsible for the billed amount at plan rate.' },
      { name: 'Nutrition Assessment',              total: '$85.00',  planRate: '$40.00', paidByKaiser: '$0.00', patientTotal: '$40.00', notes: 'Claim denied: benefit limit reached for this service type. You are responsible for the billed amount at plan rate.' },
      { name: 'Behavior Modification Counseling',  total: '$95.00',  planRate: '$35.00', paidByKaiser: '$0.00', patientTotal: '$35.00', notes: 'Claim denied: benefit limit reached for this service type. You are responsible for the billed amount at plan rate.' },
      { name: 'Meal Planning Resources',           total: '$45.00',  planRate: '$20.00', paidByKaiser: '$0.00', patientTotal: '$20.00', notes: 'Claim denied: educational materials not covered as a standalone benefit. You are responsible for the billed amount at plan rate.' }
    ],
    summary: { totalCharged: '$510.00', planRate: '$215.00', appliedToDeductible: '$0.00', yourTotal: '$215.00' }
  },
  {
    id: 6,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '4/30/2026',
    provider: 'Dr. Sarah Chen, MD', claimNumber: '4765782',
    careReceived: ['Office Visit – Pre-Diabetes Management', 'Lifestyle Counseling', 'Pre-Diabetes Education'],
    services: [
      { name: 'Office Visit – Pre-Diabetes Management', total: '$185.00', planRate: '$30.00',  paidByKaiser: '$155.00', patientTotal: '$0.00', notes: 'Flat $30 copay collected at time of service. Kaiser covered the remaining negotiated rate.' },
      { name: 'Lifestyle Counseling',                   total: '$145.00', planRate: '$115.00', paidByKaiser: '$115.00', patientTotal: '$0.00', notes: 'Covered under chronic disease management benefit. No patient balance due.' },
      { name: 'Pre-Diabetes Education',                 total: '$75.00',  planRate: '$55.00',  paidByKaiser: '$55.00',  patientTotal: '$0.00', notes: 'Preventive education benefit. Kaiser paid the full plan rate.' }
    ],
    summary: { totalCharged: '$405.00', planRate: '$200.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 7,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '4/16/2026',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4752993',
    careReceived: ['Acupuncture – 60 min', 'Moxibustion Therapy'],
    services: [
      { name: 'Acupuncture – 60 min', total: '$125.00', planRate: '$105.00', paidByKaiser: '$105.00', patientTotal: '$0.00', notes: 'Acupuncture covered at plan rate. No patient balance due.' },
      { name: 'Moxibustion Therapy',  total: '$65.00',  planRate: '$50.00',  paidByKaiser: '$50.00',  patientTotal: '$0.00', notes: 'Covered as complementary acupuncture service. No patient balance due.' }
    ],
    summary: { totalCharged: '$190.00', planRate: '$155.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 8,
    primaryBadge: 'denied', secondaryBadge: 'needs-payment',
    yourShare: '$312.00', serviceDate: '4/2/2026',
    provider: 'Dr. Michael Torres, MD', claimNumber: '4739814',
    careReceived: ['Cardiac Exercise Stress Test', 'EKG Monitoring', 'Echocardiogram', 'Cardiology Consultation'],
    services: [
      { name: 'Cardiac Exercise Stress Test', total: '$250.00', planRate: '$145.00', paidByKaiser: '$0.00', patientTotal: '$145.00', notes: 'Claim denied: this service requires prior authorization. You are responsible for the billed amount at plan rate.' },
      { name: 'EKG Monitoring',               total: '$175.00', planRate: '$95.00',  paidByKaiser: '$0.00', patientTotal: '$95.00',  notes: 'Claim denied: not a covered service without prior authorization. You are responsible for the billed amount at plan rate.' },
      { name: 'Echocardiogram',               total: '$95.00',  planRate: '$52.00',  paidByKaiser: '$0.00', patientTotal: '$52.00',  notes: 'Claim denied: prior authorization required for this service. You are responsible for the billed amount at plan rate.' },
      { name: 'Cardiology Consultation',      total: '$60.00',  planRate: '$20.00',  paidByKaiser: '$0.00', patientTotal: '$20.00',  notes: 'Claim denied: referral was not obtained before this visit. You are responsible for the billed amount at plan rate.' }
    ],
    summary: { totalCharged: '$580.00', planRate: '$312.00', appliedToDeductible: '$0.00', yourTotal: '$312.00' }
  },
  {
    id: 9,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '3/19/2026',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4727435',
    careReceived: ['Acupuncture – 60 min'],
    services: [
      { name: 'Acupuncture – 60 min', total: '$125.00', planRate: '$105.00', paidByKaiser: '$105.00', patientTotal: '$0.00', notes: 'Acupuncture covered at plan rate. No patient balance due.' }
    ],
    summary: { totalCharged: '$125.00', planRate: '$105.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 10,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '3/5/2026',
    provider: 'Dr. Sarah Chen, MD', claimNumber: '4715056',
    careReceived: ['Office Visit – Hypertension Management', 'Blood Pressure Check'],
    services: [
      { name: 'Office Visit – Hypertension Management', total: '$185.00', planRate: '$30.00', paidByKaiser: '$155.00', patientTotal: '$0.00', notes: 'Flat $30 copay collected at time of service. Kaiser covered the remaining negotiated rate.' },
      { name: 'Blood Pressure Check',                   total: '$45.00',  planRate: '$35.00', paidByKaiser: '$35.00',  patientTotal: '$0.00', notes: 'Included in hypertension management visit. No patient balance due.' }
    ],
    summary: { totalCharged: '$230.00', planRate: '$65.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 11,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '2/19/2026',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4702677',
    careReceived: ['Acupuncture – 60 min', 'Cupping Therapy'],
    services: [
      { name: 'Acupuncture – 60 min', total: '$125.00', planRate: '$105.00', paidByKaiser: '$105.00', patientTotal: '$0.00', notes: 'Acupuncture covered at plan rate. No patient balance due.' },
      { name: 'Cupping Therapy',       total: '$75.00',  planRate: '$55.00',  paidByKaiser: '$55.00',  patientTotal: '$0.00', notes: 'Covered as complementary acupuncture treatment. No patient balance due.' }
    ],
    summary: { totalCharged: '$200.00', planRate: '$160.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 12,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '2/5/2026',
    provider: 'Dr. James Wong, OD', claimNumber: '4690298',
    careReceived: ['Ophthalmology – Diabetic Eye Exam', 'Retinal Photography', 'Visual Field Testing'],
    services: [
      { name: 'Ophthalmology – Diabetic Eye Exam', total: '$185.00', planRate: '$150.00', paidByKaiser: '$150.00', patientTotal: '$0.00', notes: 'Annual diabetic eye exam covered under preventive benefit. No patient balance due.' },
      { name: 'Retinal Photography',               total: '$95.00',  planRate: '$75.00',  paidByKaiser: '$75.00',  patientTotal: '$0.00', notes: 'Retinal imaging for diabetic monitoring. Kaiser paid the full plan rate.' },
      { name: 'Visual Field Testing',              total: '$65.00',  planRate: '$50.00',  paidByKaiser: '$50.00',  patientTotal: '$0.00', notes: 'Routine visual field screening. Kaiser paid the full plan rate.' }
    ],
    summary: { totalCharged: '$345.00', planRate: '$275.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 13,
    primaryBadge: 'pending', secondaryBadge: null,
    yourShare: 'Pending amount', serviceDate: '1/22/2026',
    provider: 'Dr. Patricia Hayes, PT', claimNumber: '4677919',
    careReceived: ['Physical Therapy – Initial Evaluation', 'Therapeutic Exercise Program', 'Manual Therapy', 'Ultrasound Therapy'],
    services: [
      { name: 'Physical Therapy – Initial Evaluation', total: '$185.00', planRate: null, paidByKaiser: null, patientTotal: null, notes: 'Initial PT evaluation for musculoskeletal complaint. Claim under review.' },
      { name: 'Therapeutic Exercise Program',          total: '$95.00',  planRate: null, paidByKaiser: null, patientTotal: null, notes: 'Customized exercise program. Claim under review.' },
      { name: 'Manual Therapy',                        total: '$75.00',  planRate: null, paidByKaiser: null, patientTotal: null, notes: 'Manual manipulation and soft tissue work. Claim under review.' },
      { name: 'Ultrasound Therapy',                    total: '$55.00',  planRate: null, paidByKaiser: null, patientTotal: null, notes: 'Therapeutic ultrasound for tissue healing. Claim under review.' }
    ],
    summary: { totalCharged: '$410.00', planRate: null, appliedToDeductible: null, yourTotal: null }
  },
  {
    id: 14,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '1/8/2026',
    provider: 'Dr. Emily Rodriguez, MD', claimNumber: '4665540',
    careReceived: ['Urgent Care Visit'],
    services: [
      { name: 'Urgent Care Visit', total: '$185.00', planRate: '$30.00', paidByKaiser: '$155.00', patientTotal: '$0.00', notes: 'Flat $30 copay for urgent care visit collected at time of service. Kaiser covered the remaining negotiated rate.' }
    ],
    summary: { totalCharged: '$185.00', planRate: '$30.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 15,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '12/18/2025',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4653161',
    careReceived: ['Acupuncture – 60 min'],
    services: [
      { name: 'Acupuncture – 60 min', total: '$125.00', planRate: '$105.00', paidByKaiser: '$105.00', patientTotal: '$0.00', notes: 'Acupuncture covered at plan rate. No patient balance due.' }
    ],
    summary: { totalCharged: '$125.00', planRate: '$105.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 16,
    primaryBadge: 'approved', secondaryBadge: 'needs-payment',
    yourShare: '$65.00', serviceDate: '12/4/2025',
    provider: 'Dr. Emily Rodriguez, MD', claimNumber: '4640782',
    careReceived: ['Office Visit – Strep Throat Evaluation', 'Rapid Strep Test', 'Prescription – Amoxicillin'],
    services: [
      { name: 'Office Visit – Strep Throat Evaluation', total: '$185.00', planRate: '$30.00', paidByKaiser: '$0.00', patientTotal: '$30.00', notes: 'Office visit for acute strep throat evaluation. Applied to deductible at plan rate.' },
      { name: 'Rapid Strep Test',                       total: '$45.00',  planRate: '$20.00', paidByKaiser: '$0.00', patientTotal: '$20.00', notes: 'Rapid antigen strep test. Applied to deductible at plan rate.' },
      { name: 'Prescription – Amoxicillin',             total: '$35.00',  planRate: '$15.00', paidByKaiser: '$0.00', patientTotal: '$15.00', notes: 'Amoxicillin 500mg for strep throat treatment. Applied to deductible at plan rate.' }
    ],
    summary: { totalCharged: '$265.00', planRate: '$65.00', appliedToDeductible: '$65.00', yourTotal: '$65.00' }
  },
  {
    id: 17,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '11/20/2025',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4628403',
    careReceived: ['Acupuncture – 60 min', 'Electrical Stimulation Therapy'],
    services: [
      { name: 'Acupuncture – 60 min',          total: '$125.00', planRate: '$105.00', paidByKaiser: '$105.00', patientTotal: '$0.00', notes: 'Acupuncture covered at plan rate. No patient balance due.' },
      { name: 'Electrical Stimulation Therapy', total: '$75.00',  planRate: '$55.00',  paidByKaiser: '$55.00',  patientTotal: '$0.00', notes: 'E-stim therapy combined with acupuncture treatment. No patient balance due.' }
    ],
    summary: { totalCharged: '$200.00', planRate: '$160.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 18,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '11/6/2025',
    provider: 'Dr. Sarah Chen, MD', claimNumber: '4616024',
    careReceived: ['Annual Wellness Exam', 'Preventive Blood Work'],
    services: [
      { name: 'Annual Wellness Exam',   total: '$245.00', planRate: '$195.00', paidByKaiser: '$195.00', patientTotal: '$0.00', notes: 'Annual preventive wellness exam. Covered at no cost under ACA preventive benefit.' },
      { name: 'Preventive Blood Work',  total: '$95.00',  planRate: '$75.00',  paidByKaiser: '$75.00',  patientTotal: '$0.00', notes: 'Preventive laboratory screening. Covered at no cost under ACA preventive benefit.' }
    ],
    summary: { totalCharged: '$340.00', planRate: '$270.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 19,
    primaryBadge: 'denied', secondaryBadge: 'needs-payment',
    yourShare: '$185.00', serviceDate: '10/23/2025',
    provider: 'Dr. Patricia Hayes, PT', claimNumber: '4603645',
    careReceived: ['Physical Therapy – Session', 'Therapeutic Exercise', 'Manual Manipulation'],
    services: [
      { name: 'Physical Therapy – Session', total: '$175.00', planRate: '$95.00', paidByKaiser: '$0.00', patientTotal: '$95.00', notes: 'Claim denied: physical therapy requires a physician referral. You are responsible for the billed amount at plan rate.' },
      { name: 'Therapeutic Exercise',       total: '$95.00',  planRate: '$55.00', paidByKaiser: '$0.00', patientTotal: '$55.00', notes: 'Claim denied: service not covered without an active referral on file. You are responsible for the billed amount at plan rate.' },
      { name: 'Manual Manipulation',        total: '$65.00',  planRate: '$35.00', paidByKaiser: '$0.00', patientTotal: '$35.00', notes: 'Claim denied: service not covered without an active referral on file. You are responsible for the billed amount at plan rate.' }
    ],
    summary: { totalCharged: '$335.00', planRate: '$185.00', appliedToDeductible: '$0.00', yourTotal: '$185.00' }
  },
  {
    id: 20,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '10/9/2025',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4591266',
    careReceived: ['Acupuncture – 60 min', 'Gua Sha Therapy'],
    services: [
      { name: 'Acupuncture – 60 min', total: '$125.00', planRate: '$105.00', paidByKaiser: '$105.00', patientTotal: '$0.00', notes: 'Acupuncture covered at plan rate. No patient balance due.' },
      { name: 'Gua Sha Therapy',      total: '$55.00',  planRate: '$40.00',  paidByKaiser: '$40.00',  patientTotal: '$0.00', notes: 'Gua sha incorporated into acupuncture treatment plan. No patient balance due.' }
    ],
    summary: { totalCharged: '$180.00', planRate: '$145.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 21,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '9/25/2025',
    provider: 'Dr. Sarah Chen, MD', claimNumber: '4578887',
    careReceived: ['Office Visit – Diabetes Pre-Screening', 'Hemoglobin A1C Test'],
    services: [
      { name: 'Office Visit – Diabetes Pre-Screening', total: '$185.00', planRate: '$30.00', paidByKaiser: '$155.00', patientTotal: '$0.00', notes: 'Flat $30 copay collected at time of service. Kaiser covered the remaining negotiated rate.' },
      { name: 'Hemoglobin A1C Test',                   total: '$65.00',  planRate: '$45.00', paidByKaiser: '$45.00',  patientTotal: '$0.00', notes: 'A1C screening test. Kaiser paid the full plan rate.' }
    ],
    summary: { totalCharged: '$250.00', planRate: '$75.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 22,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '9/11/2025',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4566508',
    careReceived: ['Acupuncture – 60 min'],
    services: [
      { name: 'Acupuncture – 60 min', total: '$125.00', planRate: '$105.00', paidByKaiser: '$105.00', patientTotal: '$0.00', notes: 'Acupuncture covered at plan rate. No patient balance due.' }
    ],
    summary: { totalCharged: '$125.00', planRate: '$105.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 23,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '8/28/2025',
    provider: 'Kaiser Permanente Laboratory', claimNumber: '4554129',
    careReceived: ['Comprehensive Metabolic Panel', 'Lipid Panel'],
    services: [
      { name: 'Comprehensive Metabolic Panel', total: '$85.00', planRate: '$65.00', paidByKaiser: '$65.00', patientTotal: '$0.00', notes: 'Routine metabolic panel for ongoing health monitoring. Kaiser paid the full plan rate.' },
      { name: 'Lipid Panel',                   total: '$65.00', planRate: '$45.00', paidByKaiser: '$45.00', patientTotal: '$0.00', notes: 'Lipid screening for cardiovascular risk assessment. Kaiser paid the full plan rate.' }
    ],
    summary: { totalCharged: '$150.00', planRate: '$110.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 24,
    primaryBadge: 'approved', secondaryBadge: 'needs-payment',
    yourShare: '$45.00', serviceDate: '8/14/2025',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4541750',
    careReceived: ['Acupuncture – 60 min', 'Herbal Consultation'],
    services: [
      { name: 'Acupuncture – 60 min', total: '$125.00', planRate: '$30.00', paidByKaiser: '$0.00', patientTotal: '$30.00', notes: 'Acupuncture session applied to deductible at plan rate.' },
      { name: 'Herbal Consultation',  total: '$65.00',  planRate: '$15.00', paidByKaiser: '$0.00', patientTotal: '$15.00', notes: 'Herbal supplement consultation. Applied to deductible at plan rate.' }
    ],
    summary: { totalCharged: '$190.00', planRate: '$45.00', appliedToDeductible: '$45.00', yourTotal: '$45.00' }
  },
  {
    id: 25,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '7/31/2025',
    provider: 'Dr. Sarah Chen, MD', claimNumber: '4529371',
    careReceived: ['Office Visit – Hypertension Check'],
    services: [
      { name: 'Office Visit – Hypertension Check', total: '$185.00', planRate: '$30.00', paidByKaiser: '$155.00', patientTotal: '$0.00', notes: 'Flat $30 copay collected at time of service. Kaiser covered the remaining negotiated rate.' }
    ],
    summary: { totalCharged: '$185.00', planRate: '$30.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 26,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '7/17/2025',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4516992',
    careReceived: ['Acupuncture – 60 min', 'Trigger Point Therapy'],
    services: [
      { name: 'Acupuncture – 60 min',  total: '$125.00', planRate: '$105.00', paidByKaiser: '$105.00', patientTotal: '$0.00', notes: 'Acupuncture covered at plan rate. No patient balance due.' },
      { name: 'Trigger Point Therapy', total: '$65.00',  planRate: '$50.00',  paidByKaiser: '$50.00',  patientTotal: '$0.00', notes: 'Trigger point release during acupuncture session. No patient balance due.' }
    ],
    summary: { totalCharged: '$190.00', planRate: '$155.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 27,
    primaryBadge: 'approved', secondaryBadge: 'needs-payment',
    yourShare: '$95.00', serviceDate: '7/3/2025',
    provider: 'Dr. Patricia Hayes, PT', claimNumber: '4504613',
    careReceived: ['Physical Therapy – Session', 'Therapeutic Ultrasound'],
    services: [
      { name: 'Physical Therapy – Session', total: '$175.00', planRate: '$60.00', paidByKaiser: '$0.00', patientTotal: '$60.00', notes: 'Physical therapy session for musculoskeletal pain. Applied to deductible at plan rate.' },
      { name: 'Therapeutic Ultrasound',     total: '$75.00',  planRate: '$35.00', paidByKaiser: '$0.00', patientTotal: '$35.00', notes: 'Ultrasound therapy for tissue healing. Applied to deductible at plan rate.' }
    ],
    summary: { totalCharged: '$250.00', planRate: '$95.00', appliedToDeductible: '$95.00', yourTotal: '$95.00' }
  },
  {
    id: 28,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '6/19/2025',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4492234',
    careReceived: ['Acupuncture – 60 min'],
    services: [
      { name: 'Acupuncture – 60 min', total: '$125.00', planRate: '$105.00', paidByKaiser: '$105.00', patientTotal: '$0.00', notes: 'Acupuncture covered at plan rate. No patient balance due.' }
    ],
    summary: { totalCharged: '$125.00', planRate: '$105.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 29,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '6/5/2025',
    provider: 'Kaiser Permanente Emergency', claimNumber: '4479855',
    careReceived: ['Emergency Room Visit', 'Laceration Repair'],
    services: [
      { name: 'Emergency Room Visit', total: '$385.00', planRate: '$200.00', paidByKaiser: '$200.00', patientTotal: '$0.00', notes: 'Emergency department visit. Deductible met prior to this date of service. Kaiser covered the full plan rate.' },
      { name: 'Laceration Repair',    total: '$165.00', planRate: '$125.00', paidByKaiser: '$125.00', patientTotal: '$0.00', notes: 'Sutured laceration repair. Covered at 100% after deductible. No patient balance due.' }
    ],
    summary: { totalCharged: '$550.00', planRate: '$325.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 30,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '5/22/2025',
    provider: 'Dr. Lisa Patel, LAc', claimNumber: '4467476',
    careReceived: ['Acupuncture – 60 min', 'Cupping Therapy'],
    services: [
      { name: 'Acupuncture – 60 min', total: '$125.00', planRate: '$105.00', paidByKaiser: '$105.00', patientTotal: '$0.00', notes: 'Acupuncture covered at plan rate. No patient balance due.' },
      { name: 'Cupping Therapy',      total: '$75.00',  planRate: '$55.00',  paidByKaiser: '$55.00',  patientTotal: '$0.00', notes: 'Cupping therapy as complement to acupuncture. No patient balance due.' }
    ],
    summary: { totalCharged: '$200.00', planRate: '$160.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  },
  {
    id: 31,
    primaryBadge: 'approved', secondaryBadge: 'payment-resolved',
    yourShare: '$0.00', serviceDate: '5/8/2025',
    provider: 'Dr. Sarah Chen, MD', claimNumber: '4455097',
    careReceived: ['Office Visit – Annual Blood Pressure Review', 'Blood Pressure Monitoring Assessment'],
    services: [
      { name: 'Office Visit – Annual Blood Pressure Review', total: '$185.00', planRate: '$30.00', paidByKaiser: '$155.00', patientTotal: '$0.00', notes: 'Flat $30 copay collected at time of service. Kaiser covered the remaining negotiated rate.' },
      { name: 'Blood Pressure Monitoring Assessment',        total: '$85.00',  planRate: '$65.00', paidByKaiser: '$65.00',  patientTotal: '$0.00', notes: '24-hour blood pressure monitoring assessment. Kaiser paid the full plan rate.' }
    ],
    summary: { totalCharged: '$270.00', planRate: '$95.00', appliedToDeductible: '$0.00', yourTotal: '$0.00' }
  }
];

export const PAGINATION = { total: 31, perPage: 12, current: 1 };
