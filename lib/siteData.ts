export interface ProductModule {
  id: string;
  slug: string;
  name: string;
  category: 'Monitoring' | 'Physical' | 'Response' | 'Compliance' | 'Analytics' | 'Identity' | 'Alerting';
  tagline: string;
  shortDescription: string;
  requirements: [string, string, string];
  expandedFeatures: [
    { title: string; description: string },
    { title: string; description: string },
    { title: string; description: string }
  ];
  primaryRoles: string[];
  roleBenefit: string;
  dayInTheLife: string;
  relatedModuleSlugs: string[];
  metric: string;
  metricLabel: string;
}

export interface IndustrySolution {
  id: string;
  name: string;
  slug: string;
  oneLiner: string;
  description: string;
  challenges: string[];
  keyCapabilities: string[];
  stats: string;
  statsLabel: string;
}

export interface RoleData {
  title: string;
  shortTitle: string;
  benefit: string;
  linkedModuleSlug: string;
  moduleName: string;
  responsibilities: string[];
}

export const USER_ROLES: string[] = [
  'Chief Security Officer (CSO)',
  'Security Analyst',
  'IT Administrator',
  'Security Guard / Field Officer',
  'Employee',
  'Compliance Auditor',
  'Admin'
];

export const PRODUCT_MODULES: ProductModule[] = [
  {
    id: 'soc-dashboard',
    slug: 'soc-dashboard',
    name: 'SOC Dashboard',
    category: 'Monitoring',
    tagline: 'The Centralized Command Center for Enterprise Defense',
    shortDescription: 'Centralized, real-time view of every security event, active threats, incidents, alarms, and live asset health across digital and physical perimeters.',
    requirements: [
      'Security teams should monitor all security events through a centralized dashboard',
      'The dashboard should display active threats, incidents, alarms, and security health',
      'Live operational status should be available for all protected assets'
    ],
    expandedFeatures: [
      {
        title: 'Unified Global Telemetry Aggregation',
        description: 'Ingests millions of security telemetry streams from endpoint firewalls, cloud infrastructure, physical access turnstiles, and CCTV motion detectors. Provides a unified operational view that eliminates blind spots between disparate digital and physical security tools.'
      },
      {
        title: 'Real-Time Threat Severity Matrix & Active Alarms',
        description: 'Continuously categorizes active security events across severity levels from low-priority anomalies to critical multi-vector attacks. Visual indicators and live event tickers ensure analysts immediately triage and isolate severe threats without alert fatigue.'
      },
      {
        title: 'Dynamic Asset Health & Spatial Mapping',
        description: 'Monitors the operational integrity of servers, network switches, biometric access readers, and surveillance cameras in real time. Visual floorplans and GIS map overlays provide immediate location context when any device fails or gets breached.'
      }
    ],
    primaryRoles: ['Security Analyst', 'Chief Security Officer (CSO)', 'IT Administrator'],
    roleBenefit: 'Provides instant situational awareness and single-click access into incident triage, eliminating cross-tool confusion.',
    dayInTheLife: 'Security analysts begin their shifts monitoring the live SOC dashboard, immediately spotting correlated anomalies and dispatching automated containment runbooks within seconds.',
    relatedModuleSlugs: ['cyber-threat-monitoring', 'physical-security', 'incident-response'],
    metric: '94%',
    metricLabel: 'Reduction in Cross-Console Context Switching'
  },
  {
    id: 'cyber-threat-monitoring',
    slug: 'cyber-threat-monitoring',
    name: 'Cyber Threat Monitoring',
    category: 'Monitoring',
    tagline: 'Continuous Digital Telemetry Ingestion & Correlation',
    shortDescription: 'Collects security events from enterprise systems, classifies threats by severity/category, and correlates incidents across multiple data sources.',
    requirements: [
      'The platform should collect security events from enterprise systems',
      'Threats should be classified by severity and category',
      'Security incidents should be correlated across multiple data sources'
    ],
    expandedFeatures: [
      {
        title: 'High-Throughput Enterprise Log Ingestion',
        description: 'Ingests syslog, audit streams, network flows, and cloud API events with sub-second latency. Connects seamlessly with standard enterprise infrastructure, firewalls, and endpoint detection agents without performance degradation.'
      },
      {
        title: 'MITRE ATT&CK Mapping & Threat Classification',
        description: 'Automatically tags every detected threat against the MITRE ATT&CK taxonomy, categorizing attacks by tactic, technique, and severity. Enables security teams to rapidly understand attack vectors and adversary intentions.'
      },
      {
        title: 'Cross-Domain Event Correlation Engine',
        description: 'Correlates raw cyber telemetry against physical access logs and authentication histories using Complex Event Processing (CEP). Identifies stealthy anomalies such as impossible physical travel and compromised privileged credentials.'
      }
    ],
    primaryRoles: ['Security Analyst', 'IT Administrator'],
    roleBenefit: 'Automates threat classification and correlation so analysts focus on high-impact containment rather than manual log parsing.',
    dayInTheLife: 'IT administrators and cyber analysts review threat streams where network anomalies are pre-correlated with employee location data, stopping credential hijacking before lateral movement occurs.',
    relatedModuleSlugs: ['soc-dashboard', 'incident-response', 'identity-access-control'],
    metric: '< 100ms',
    metricLabel: 'Event Ingestion & Correlation Latency'
  },
  {
    id: 'physical-security',
    slug: 'physical-security',
    name: 'Physical Security Management',
    category: 'Physical',
    tagline: 'Campus, Building, Checkpoint & CCTV Operations',
    shortDescription: 'Manages buildings, entry points, CCTV systems, alarms, and checkpoints; monitors visitor access; and records and investigates physical incidents.',
    requirements: [
      'Organizations should manage buildings, entry points, CCTV systems, alarms, and security checkpoints',
      'Visitor access should be monitored',
      'Physical incidents should be recorded and investigated'
    ],
    expandedFeatures: [
      {
        title: 'Facility, Zone & Checkpoint Hierarchy',
        description: 'Configures multi-tier spatial hierarchies across campuses, corporate headquarters, manufacturing plants, and datacenters. Assigns precise security zones with tailored clearance policies and automated barrier controls.'
      },
      {
        title: 'Integrated VMS & Smart Camera Feeds',
        description: 'Directly integrates with ONVIF and RTSP video management systems for live video matrix viewing, automated PTZ tracking on alarm triggers, and guard bookmarking for investigation evidence locker storage.'
      },
      {
        title: 'Visitor Management & Physical Investigation',
        description: 'Manages the complete visitor lifecycle from host pre-registration and kiosk self check-in to NDA execution and exit tracking. Records physical incident logs with photo timestamps and guard patrol notes.'
      }
    ],
    primaryRoles: ['Security Guard / Field Officer', 'Chief Security Officer (CSO)'],
    roleBenefit: 'Gives field teams and GSOC operators unified control over cameras, barriers, and visitor checkpoints from one console.',
    dayInTheLife: 'Field officers at entry checkpoints verify visitor credentials, monitor turnstile alarms, and receive instant push dispatch notifications with floorplan routing during perimeter alerts.',
    relatedModuleSlugs: ['identity-access-control', 'emergency-alerts', 'soc-dashboard'],
    metric: '100%',
    metricLabel: 'Checkpoint & Perimeter Visibility'
  },
  {
    id: 'identity-access-control',
    slug: 'identity-access-control',
    name: 'Identity & Access Control',
    category: 'Identity',
    tagline: 'Converged Cyber IAM and Physical PACS Governance',
    shortDescription: 'Manages employee/contractor identities, assigns access by department and security level, and logs all entry/exit activity with immutable audit trails.',
    requirements: [
      'Employee and contractor identities should be managed',
      'Access permissions should be assigned based on departments and security levels',
      'Entry and exit activities should be logged'
    ],
    expandedFeatures: [
      {
        title: 'Unified Identity Directory (IAM + PACS)',
        description: 'Bridges Okta, Azure AD, and LDAP directory groups with physical RFID card serials and biometric credentials. Ensures employee onboarding, department transfers, and terminations immediately synchronize across both digital applications and physical door access.'
      },
      {
        title: 'Role-Based Access Control & Zone Clearances',
        description: 'Assigns granular access permissions according to organizational hierarchy, security clearance tiers, and time-of-day schedules. Enforces strict access restrictions for sensitive server datacenters and research laboratories.'
      },
      {
        title: 'Immutable Entry & Exit Activity Logging',
        description: 'Cryptographically logs every turnstile badge tap, biometric scan, and failed access attempt in an append-only audit trail. Provides immediate historical query capabilities for compliance reviews and forensic investigations.'
      }
    ],
    primaryRoles: ['IT Administrator', 'Compliance Auditor'],
    roleBenefit: 'Eliminates orphaned badges and ensures immediate physical credential revocation upon employee offboarding.',
    dayInTheLife: 'IT administrators manage unified user accounts where granting access to a cloud repository simultaneously updates the physical badge permissions for the corresponding engineering laboratory.',
    relatedModuleSlugs: ['physical-security', 'compliance-audit', 'cyber-threat-monitoring'],
    metric: '0 sec',
    metricLabel: 'Offboarding Sync Latency Across Systems'
  },
  {
    id: 'incident-response',
    slug: 'incident-response',
    name: 'Incident Response Management',
    category: 'Response',
    tagline: 'Orchestrated SOAR Playbooks & Root-Cause Resolution',
    shortDescription: 'Create, assign, investigate, and resolve incidents; evidence collection, root-cause analysis, corrective actions, and configurable escalation.',
    requirements: [
      'Security teams should create, assign, investigate, and resolve incidents',
      'Incident workflows should include evidence collection, root cause analysis, corrective actions, and closure',
      'Escalation procedures should be configurable'
    ],
    expandedFeatures: [
      {
        title: 'Automated Incident Triage & Playbooks',
        description: 'Triggers pre-configured SOAR runbooks upon alarm generation, automatically creating tickets, assigning lead responders, and initiating containment protocols such as network host isolation and perimeter lockdown.'
      },
      {
        title: 'Tamper-Proof Digital Evidence Locker',
        description: 'Centralizes packet captures, server logs, CCTV video snapshots, and witness testimony into cryptographically hashed evidence packages ($SHA-256$). Guarantees strict chain-of-custody preservation for legal and regulatory compliance.'
      },
      {
        title: 'Structured Root Cause Analysis (RCA) & Closure',
        description: 'Guides investigators through formal post-mortem workflows, linking verified root causes directly to risk register updates, firewall rule amendments, and compliance remediations.'
      }
    ],
    primaryRoles: ['Security Analyst', 'Chief Security Officer (CSO)'],
    roleBenefit: 'Accelerates mean-time-to-respond (MTTR) by replacing manual triage spreadsheets with guided orchestration playbooks.',
    dayInTheLife: 'When a critical alert triggers, the analyst opens a pre-populated incident room where containment actions, evidence logs, and escalation notifications are executed in a single guided flow.',
    relatedModuleSlugs: ['soc-dashboard', 'emergency-alerts', 'risk-vulnerability'],
    metric: '78%',
    metricLabel: 'Faster Incident Mean Time to Resolution (MTTR)'
  },
  {
    id: 'risk-vulnerability',
    slug: 'risk-vulnerability',
    name: 'Risk & Vulnerability Management',
    category: 'Analytics',
    tagline: 'Continuous Cyber-Physical Risk Scoring & Remediation',
    shortDescription: 'Identifies operational, cyber, and physical security risks, auto-calculates risk scores, and supports remediation planning.',
    requirements: [
      'Organizations should identify operational, cyber, and physical security risks',
      'Risk scores should be calculated automatically',
      'Vulnerability assessments should support remediation planning'
    ],
    expandedFeatures: [
      {
        title: 'Multi-Vector Risk Identification',
        description: 'Aggregates open CVE vulnerabilities, unpatched endpoint firmware, broken physical perimeter sensors, and expired badge credentials into a single unified risk register.'
      },
      {
        title: 'Dynamic Automated Risk Scoring Algorithm',
        description: 'Continuously computes enterprise risk scores using asset criticality, exploitability metrics, and physical zone sensitivity. Gives leadership an objective measure of organizational exposure across all business units.'
      },
      {
        title: 'Remediation Planning & SLA Tracking',
        description: 'Converts discovered vulnerabilities into prioritized remediation tasks with automated SLA tracking. Bridges security findings with IT engineering ticketing systems for rapid patch deployment.'
      }
    ],
    primaryRoles: ['Chief Security Officer (CSO)', 'IT Administrator'],
    roleBenefit: 'Translates technical vulnerabilities and physical facility gaps into actionable executive risk scores.',
    dayInTheLife: 'Security executives examine risk heatmaps by facility and business unit, prioritizing capital allocation and engineering sprint capacity to address the highest-exposure vulnerabilities.',
    relatedModuleSlugs: ['compliance-audit', 'security-analytics', 'cyber-threat-monitoring'],
    metric: '100%',
    metricLabel: 'Automated Asset Risk Quantification'
  },
  {
    id: 'compliance-audit',
    slug: 'compliance-audit',
    name: 'Compliance & Audit Management',
    category: 'Compliance',
    tagline: 'Continuous Regulatory Auditing & Evidence Generation',
    shortDescription: 'Manages compliance requirements and audits; findings generate corrective actions; and audit reports support regulatory inspection.',
    requirements: [
      'Organizations should manage compliance requirements and security audits',
      'Audit findings should generate corrective actions',
      'Compliance reports should support regulatory inspections'
    ],
    expandedFeatures: [
      {
        title: 'Multi-Framework Regulatory Mapping',
        description: 'Includes out-of-the-box controls for ISO/IEC 27001, SOC 2 Type II, NIST CSF, PCI-DSS, GDPR, HIPAA, and OSHA physical safety standards. Maps unified platform telemetry directly to required compliance controls.'
      },
      {
        title: 'Automated Audit Finding & Remediation Workflows',
        description: 'Automatically flags policy deviations, expired contractor accesses, and unreviewed access logs as audit findings. Generates corrective action assignments with accountability tracking and due dates.'
      },
      {
        title: 'One-Click Regulatory Inspection Reports',
        description: 'Generates comprehensive, auditor-ready compliance packages containing immutable audit log extracts, access matrix reviews, and incident resolution proofs at the touch of a button.'
      }
    ],
    primaryRoles: ['Compliance Auditor', 'Chief Security Officer (CSO)', 'Admin'],
    roleBenefit: 'Eliminates months of manual evidence gathering during annual SOC 2, ISO, and regulatory compliance audits.',
    dayInTheLife: 'Auditors log into a dedicated compliance portal with read-only verification access, reviewing tamper-proof audit trails and exporting complete control verification artifacts in minutes.',
    relatedModuleSlugs: ['identity-access-control', 'risk-vulnerability', 'security-analytics'],
    metric: '85%',
    metricLabel: 'Reduction in Audit Preparation Overhead'
  },
  {
    id: 'security-analytics',
    slug: 'security-analytics',
    name: 'Security Analytics & Intelligence',
    category: 'Analytics',
    tagline: 'Executive Posture Metrics, Trends & Strategic Insights',
    shortDescription: 'Dashboards for security posture, incident trends, risk exposure, response time, compliance scores, and historical data for strategic planning.',
    requirements: [
      'Executives should access dashboards showing security posture, incident trends, and risk exposure',
      'Analytics should include response time, recurring threats, compliance scores, and operational performance',
      'Historical security data should support strategic planning'
    ],
    expandedFeatures: [
      {
        title: 'Executive Posture & Risk Exposure Dashboards',
        description: 'Delivers high-level KPI visualizers tailored for the board and executive committee. Displays aggregate posture ratings, active risk reductions, and benchmarking against industry standards.'
      },
      {
        title: 'Operational Response Time & Trend Metrics',
        description: 'Tracks key SecOps performance indicators including Mean Time to Detect (MTTD), Mean Time to Respond (MTTR), recurring attack patterns, and facility-by-facility alarm trends.'
      },
      {
        title: 'Historical Forecasting & Strategic Planning',
        description: 'Analyzes long-term security telemetry to predict seasonal threat surges, physical security congestion at major facilities, and budget requirements for upcoming infrastructure upgrades.'
      }
    ],
    primaryRoles: ['Chief Security Officer (CSO)', 'Admin'],
    roleBenefit: 'Empowers security leadership with data-driven evidence to demonstrate ROI and justify security investments to the board.',
    dayInTheLife: 'The CSO reviews monthly board-ready reports highlighting a 78% drop in MTTR and 100% compliance adherence across 24 global facilities.',
    relatedModuleSlugs: ['soc-dashboard', 'risk-vulnerability', 'compliance-audit'],
    metric: '360°',
    metricLabel: 'Enterprise Security Posture Visibility'
  },
  {
    id: 'emergency-alerts',
    slug: 'emergency-alerts',
    name: 'Emergency Alerts & Notifications',
    category: 'Alerting',
    tagline: 'Multi-Channel Critical Communications & Facility Lockdown',
    shortDescription: 'Alerts for incidents, unauthorized access, cyber threats, and emergencies; multi-level escalation workflows; and instant emergency broadcast.',
    requirements: [
      'Users should receive alerts for security incidents, unauthorized access, cyber threats, and emergencies',
      'Multi-level escalation workflows should be supported',
      'Emergency broadcast notifications should reach designated teams instantly'
    ],
    expandedFeatures: [
      {
        title: 'Instant Multi-Channel Mass Notification',
        description: 'Dispatches emergency alerts simultaneously via SMS, Push notifications, automated phone calls, desktop emergency takeovers, and email to thousands of employees in seconds.'
      },
      {
        title: 'Automated Multi-Level Escalation Trees',
        description: 'Ensures critical alarms are acknowledged by designated tier responders. Automatically cascades alerts to backup personnel, team leads, and law enforcement if unacknowledged within defined SLA windows.'
      },
      {
        title: 'Emergency Facility Lockdown & Mustering',
        description: 'Integrates directly with physical access control systems to trigger immediate facility door lockdowns while monitoring real-time evacuation muster point check-ins for employee safety.'
      }
    ],
    primaryRoles: ['Employee', 'Security Guard / Field Officer', 'Chief Security Officer (CSO)'],
    roleBenefit: 'Ensures zero-delay crisis communication and rapid employee accounting during natural disasters or active security events.',
    dayInTheLife: 'During an active perimeter breach, the system instantly triggers safety notifications to all building occupants while locking down vulnerable access corridors.',
    relatedModuleSlugs: ['physical-security', 'incident-response', 'soc-dashboard'],
    metric: '< 3 sec',
    metricLabel: 'Mass Emergency Notification Broadcast Time'
  }
];

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: 'airports',
    name: 'Airports',
    slug: 'airports',
    oneLiner: 'Perimeter defense, passenger checkpoint flow, and zero-trust airside access.',
    description: 'Airports operate in high-density environments where physical breaches (runway access, gate tampering) and cyber attacks (air traffic IT, ticketing systems) can paralyze critical national infrastructure. RedFort bridges terminal surveillance with backend IT monitoring.',
    challenges: [
      'Massive physical perimeters spanning miles with perimeter intrusion vulnerabilities',
      'High-throughput passenger access control and baggage handling IT convergence',
      'Strict FAA, ICAO, and TSA compliance mandates with zero tolerance for downtime'
    ],
    keyCapabilities: [
      'Correlated Perimeter & Checkpoint Defense: Auto-tracks intrusion alarms with PTZ cameras',
      'Airside Access Control: Biometric verification and time-restricted tarmac credentials',
      'Real-Time Aviation IT Monitoring: Unified SIEM monitoring flight displays, ticketing, and baggage systems'
    ],
    stats: '100%',
    statsLabel: 'Perimeter & Airside Zone Coverage'
  },
  {
    id: 'banks',
    name: 'Banks & Financial Institutions',
    slug: 'banks',
    oneLiner: 'Vault security, teller branch access, and financial cyber-fraud correlation.',
    description: 'Financial institutions must protect both physical vaults/branches and high-frequency trading data centers against insider threats, ransom operations, and sophisticated social engineering attacks.',
    challenges: [
      'Severe regulatory requirements (PCI-DSS, GLBA, SOC 2, SOX) requiring immutable audit logs',
      'Coordinated cyber-physical bank branch and ATM robbery threats',
      'Insider threat risks involving privileged access to core banking transaction networks'
    ],
    keyCapabilities: [
      'Branch Vault & Datacenter Sensor Correlation: Triggers alarms on dual-custody access violations',
      'Impossible Physical Travel Protection: Halts trading logins if user badge is at a different location',
      'Immutable Financial Audit Trail: SHA-256 hashed activity logs for regulatory inspection'
    ],
    stats: '99.999%',
    statsLabel: 'Audit Integrity & Availability'
  },
  {
    id: 'hospitals',
    name: 'Hospitals & Healthcare',
    slug: 'hospitals',
    oneLiner: 'Pharmacy access control, patient data security, and medical IoT protection.',
    description: 'Modern medical centers house critical life-support infrastructure, valuable pharmaceuticals, and sensitive EHR databases. RedFort safeguards patients and caregivers against ransomware and physical intrusions.',
    challenges: [
      'Open public hospital environments requiring controlled pharmacy and maternity ward zones',
      'Ransomware threats targeting medical IoT (infusion pumps, MRI scanners, PACS networks)',
      'Strict HIPAA compliance standards for electronic protected health information (ePHI)'
    ],
    keyCapabilities: [
      'Restricted Pharmacy & OR Access: Enforces biometric badge clearance with video logging',
      'Medical Device Isolation: Detects anomalous network traffic from life-critical IoT hardware',
      'Staff Panic & Emergency Broadcast: Instant silent alert dispatch for nurse stations'
    ],
    stats: '84%',
    statsLabel: 'Faster Pharmacy Incident Response'
  },
  {
    id: 'government',
    name: 'Government Organizations',
    slug: 'government',
    oneLiner: 'Classified facility SCIF access, mission-critical resilience, and FedRAMP posture.',
    description: 'Federal, regional, and municipal agencies manage sensitive citizen registries, public utilities, and classified installations that demand stringent zero-trust and defense-in-depth protection.',
    challenges: [
      'Nation-state advanced persistent threats (APTs) targeting public infrastructure',
      'High-security facility standards (SCIFs, emergency operations centers, municipal courts)',
      'Strict mandates including NIST 800-53, FedRAMP, and public sector audit standards'
    ],
    keyCapabilities: [
      'Multi-Level Clearance Enforcement: Hardware-backed RBAC with CAC/PIV card support',
      'SCIF Perimeter & Acoustic Sensor Ingestion: Continuous anti-eavesdropping monitoring',
      'Sovereign Deployment: Air-gapped on-premise or sovereign cloud hosting'
    ],
    stats: 'FedRAMP',
    statsLabel: 'High Security Standard Ready'
  },
  {
    id: 'enterprises',
    name: 'Global Enterprises',
    slug: 'enterprises',
    oneLiner: 'Multi-campus headquarters, executive protection, and global cloud infrastructure.',
    description: 'Distributed Fortune 500 corporations require unified governance across dozens of international offices, thousands of remote workers, and complex hybrid-cloud systems.',
    challenges: [
      'Fragmented security tools across regional offices creating compliance and visibility gaps',
      'Executive protection and travel risk intelligence for C-suite personnel',
      'Complex contractor and supply chain access governance'
    ],
    keyCapabilities: [
      'Global Security Operations Center (GSOC) Management: Single dashboard across 50+ countries',
      'Executive Protection Geofencing: Real-time threat alerts around corporate travel routes',
      'Automated Enterprise SOAR: Pre-built playbooks for phishing, badge cloning, and data leaks'
    ],
    stats: '50+ Loc',
    statsLabel: 'Unified Under Single GSOC'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industrial',
    slug: 'manufacturing',
    oneLiner: 'Factory floor safety, supply chain assets, and OT/ICS network segmentation.',
    description: 'Industrial assembly plants and semiconductor fabs combine sensitive intellectual property with hazardous physical machinery and legacy operational technology (SCADA/PLC) networks.',
    challenges: [
      'Air-gapped OT/IT convergence vulnerabilities exposed to industrial malware',
      'Physical safety hazards, unauthorized cleanroom access, and raw material theft',
      'Costly factory downtime caused by unscheduled disruptions or safety breaches'
    ],
    keyCapabilities: [
      'OT Network & Sensor Monitoring: Detects unauthorized PLC logic modifications',
      'Hazardous Zone & Machine Access Control: Prevents untrained personnel machine operation',
      'Supply Chain Asset Tracking: RFID checkpoint scanning for high-value components'
    ],
    stats: '92%',
    statsLabel: 'Industrial Downtime Prevention'
  },
  {
    id: 'it-companies',
    name: 'IT & Software Companies',
    slug: 'it-companies',
    oneLiner: 'Datacenter server racks, intellectual property repositories, and SOC 2 adherence.',
    description: 'Tech companies handle proprietary codebase repositories, customer cloud databases, and multi-tenant hosting environments that are constant targets for supply-chain cyber attacks.',
    challenges: [
      'Maintaining SOC 2 Type II and ISO 27001 continuous compliance across cloud deployments',
      'Physical server rack access security inside co-located datacenters',
      'Insider threat prevention regarding source code and privileged cloud keys'
    ],
    keyCapabilities: [
      'Server Rack Micro-Access Control: Dual-factor authentication on physical server cages',
      'Code Repository & Physical Location Correlation: Blocks Git pushes if developer badge is inactive',
      'Automated SOC 2 Compliance Reports: Continuous evidence generation for annual audits'
    ],
    stats: '100%',
    statsLabel: 'Continuous SOC 2 Evidence Tracking'
  },
  {
    id: 'universities',
    name: 'Universities & Education',
    slug: 'universities',
    oneLiner: 'Open campus perimeter safety, dormitory access, and research lab protection.',
    description: 'Colleges and research institutions balance an open, welcoming campus environment for thousands of students with strict access control for biological research labs and student housing.',
    challenges: [
      'Large open geographic perimeters with mixed public and restricted student zones',
      'High-volume student and faculty digital credential lifecycle management',
      'Critical mass notification requirements during campus safety emergencies'
    ],
    keyCapabilities: [
      'Mobile Student Digital Badges: Contactless NFC access to dorms, dining, and libraries',
      'Campus-Wide Emergency Broadcast: Instant audio sirens and mobile push notifications',
      'Sensitive Research Lab Security: Biometric controls safeguarding grant-funded research'
    ],
    stats: '50k+',
    statsLabel: 'Concurrent Students Secured'
  },
  {
    id: 'logistics',
    name: 'Logistics & Warehousing',
    slug: 'logistics',
    oneLiner: 'Distribution center gates, cargo fleet tracking, and dock checkpoint verification.',
    description: 'Fulfillment centers and global supply chains face high turnover, inventory shrinkage, and continuous freight carrier traffic across hundreds of loading docks.',
    challenges: [
      'High volume of temporary contractors, freight drivers, and freight carrier vehicles',
      'Cargo theft and unauthorized warehouse floor access during night shifts',
      'Worker safety compliance in high-density forklift and automated conveyor zones'
    ],
    keyCapabilities: [
      'Automated Gate & License Plate Recognition (LPR): Speeds up verified freight processing',
      'High-Value Cargo Cage Alarms: Laser tripwires and motion-activated surveillance',
      'Forklift & Hazard Zone Geo-Fencing: Safety alerts for pedestrian workers in dangerous lanes'
    ],
    stats: '70%',
    statsLabel: 'Reduction in Gate Processing Latency'
  },
  {
    id: 'smart-cities',
    name: 'Smart Cities & Critical Infrastructure',
    slug: 'smart-cities',
    oneLiner: 'Municipal grid protection, public transport surveillance, and emergency response.',
    description: 'Smart municipalities unify municipal sensor arrays, water treatment controls, traffic grid networks, and emergency dispatch centers into an integrated city-wide operations defense system.',
    challenges: [
      'Multi-agency coordination between police, fire, public transit, and power grid operators',
      'Cyber-physical threats targeting water systems, substations, and traffic light grids',
      'Massive IoT sensor volume requiring low-latency real-time filtering and correlation'
    ],
    keyCapabilities: [
      'City-Wide GIS Incident Heatmap: Live status overlays across public transit and utilities',
      'Utility SCADA Anomaly Detection: Immediate alerts on pressure or power flow deviations',
      'Inter-Agency Emergency Protocol Dispatch: Instant situational feeds to first responders'
    ],
    stats: 'Sub-Sec',
    statsLabel: 'City-Wide Sensor Telemetry Processing'
  }
];

export const ROLE_DEFINITIONS: RoleData[] = [
  {
    title: 'Chief Security Officer (CSO)',
    shortTitle: 'CSO',
    benefit: 'Holistic posture metrics, enterprise risk exposure heatmaps, and board-level compliance ROI.',
    linkedModuleSlug: 'security-analytics',
    moduleName: 'Security Analytics & Intelligence',
    responsibilities: [
      'Evaluate cross-organization risk posture and capital security allocations',
      'Present auditor-verified compliance scores to executive stakeholders and the board',
      'Establish enterprise-wide escalation policies and incident governance standards'
    ]
  },
  {
    title: 'Security Analyst',
    shortTitle: 'Security Analyst',
    benefit: 'Correlated multi-vector threat feeds, guided SOAR investigation playbooks, and evidence lockers.',
    linkedModuleSlug: 'soc-dashboard',
    moduleName: 'SOC Dashboard',
    responsibilities: [
      'Triage active digital and physical alarms from a single centralized console',
      'Execute automated containment runbooks (host quarantine, door lockdown) in seconds',
      'Conduct structured Root Cause Analysis (RCA) and preserve tamper-proof evidence'
    ]
  },
  {
    title: 'IT Administrator',
    shortTitle: 'IT Admin',
    benefit: 'Unified IAM and PACS provisioning, asset health monitoring, and syslog ingestion connectors.',
    linkedModuleSlug: 'identity-access-control',
    moduleName: 'Identity & Access Control',
    responsibilities: [
      'Synchronize user permissions between Okta/Azure AD and physical door badge controllers',
      'Monitor health metrics for switches, biometric readers, firewalls, and server racks',
      'Configure automated offboarding workflows with zero residual access credentials'
    ]
  },
  {
    title: 'Security Guard / Field Officer',
    shortTitle: 'Field Officer',
    benefit: 'Mobile checkpoint badge verification, live CCTV alarm streams, and instant panic dispatches.',
    linkedModuleSlug: 'physical-security',
    moduleName: 'Physical Security Management',
    responsibilities: [
      'Verify visitor QR passes and issue digital guest badges at reception kiosks',
      'Receive instant mobile dispatch notifications with facility floorplan navigation',
      'Perform security zone patrol sweeps and log incident reports with photo timestamps'
    ]
  },
  {
    title: 'Compliance Auditor',
    shortTitle: 'Compliance Auditor',
    benefit: 'Read-only access to immutable audit logs, regulatory checklists, and one-click evidence export.',
    linkedModuleSlug: 'compliance-audit',
    moduleName: 'Compliance & Audit Management',
    responsibilities: [
      'Review automated control mappings for SOC 2, ISO 27001, NIST CSF, and HIPAA',
      'Verify cryptographic SHA-256 integrity hashes on historical access and incident logs',
      'Export comprehensive audit findings and monitor corrective action fulfillment'
    ]
  },
  {
    title: 'Employee',
    shortTitle: 'Employee',
    benefit: 'Digital NFC access badge, visitor self-service invites, and rapid emergency safety check-ins.',
    linkedModuleSlug: 'emergency-alerts',
    moduleName: 'Emergency Alerts & Notifications',
    responsibilities: [
      'Pre-register expected office visitors with automated QR pass generation',
      'Access authorized campus zones using mobile smartphone NFC credentials',
      'Acknowledge emergency evacuation muster roll-calls during drills and critical incidents'
    ]
  },
  {
    title: 'Admin',
    shortTitle: 'Admin',
    benefit: 'Organization tenant setup, multi-facility builder, RBAC governance, and alert rule templating.',
    linkedModuleSlug: 'soc-dashboard',
    moduleName: 'Admin & Governance Engine',
    responsibilities: [
      'Configure organization hierarchy, campuses, buildings, and security zone boundaries',
      'Define automated correlation rules, escalation thresholds, and notification templates',
      'Monitor platform health, API connector uptime, and system-wide administrative audit logs'
    ]
  }
];

export const TRUST_BADGES = [
  { name: 'SOC 2 Type II Certified', description: 'Audited security, availability, and confidentiality controls.' },
  { name: 'ISO / IEC 27001', description: 'Certified Information Security Management System (ISMS).' },
  { name: 'GDPR Compliant', description: 'Role-based privacy controls and strict data residency adherence.' },
  { name: 'HIPAA Ready', description: 'Safeguards for electronic protected health information (ePHI).' },
  { name: 'FedRAMP In-Process', description: 'Architected for rigorous federal and public sector security standards.' }
];

export const CLIENT_LOGOS = [
  'AeroDynamics Global',
  'Nordic Trust Bank',
  'Apex Health Systems',
  'Vanguard Cloud Corp',
  'Titan Industrial',
  'Metro TransLink',
  'Aegis Defense Labs',
  'Quantum Robotics',
  'Pacific Freightways',
  'Nova Energy Grid'
];

export const PRICING_TIERS = [
  {
    name: 'Starter',
    badge: 'Single Facility / Core Defense',
    description: 'Designed for single-campus organizations seeking centralized cyber monitoring and basic physical access.',
    price: '$2,400',
    period: '/ month',
    scope: 'Up to 1 Facility · Up to 250 Identities',
    bestFor: 'Best for: Single office locations requiring core SOC monitoring and visitor access governance.',
    highlight: false,
    cta: 'Get Started with Starter',
    modulesIncluded: ['SOC Dashboard', 'Cyber Threat Monitoring', 'Physical Security Management'],
    features: [
      'Centralized SOC dashboard for real-time monitoring',
      'Cyber threat log ingestion (up to 5,000 events/sec)',
      'Visitor check-in kiosk with digital badges',
      'Role-based access control for up to 3 admin roles',
      'Standard email & push notifications',
      '99.9% Uptime SLA with 24/7 email support'
    ]
  },
  {
    name: 'Professional',
    badge: 'Multi-Facility / Most Popular',
    description: 'Comprehensive security operations for growing enterprises with multiple regional facilities and compliance obligations.',
    price: '$5,800',
    period: '/ month',
    scope: 'Up to 5 Facilities · Up to 2,500 Identities',
    bestFor: 'Best for: Multi-facility enterprises needing automated SOAR response, compliance management, and risk scoring.',
    highlight: true,
    cta: 'Request Professional Demo',
    modulesIncluded: [
      'SOC Dashboard',
      'Cyber Threat Monitoring',
      'Physical Security Management',
      'Identity & Access Control',
      'Incident Response Management',
      'Risk & Vulnerability Management',
      'Compliance & Audit Management'
    ],
    features: [
      'Everything in Starter, plus 4 additional modules',
      'Real-time cyber-physical threat correlation engine',
      'Automated SOAR incident response playbooks',
      'Continuous compliance mapping (SOC 2, ISO 27001, HIPAA)',
      'Dynamic automated risk scoring & vulnerability planner',
      'Immutable SHA-256 cryptographic audit trails',
      '99.95% Uptime SLA with dedicated technical account manager'
    ]
  },
  {
    name: 'Enterprise',
    badge: 'Global Scale / Full Suite',
    description: 'Full 9-module suite with unlimited facilities, dedicated GSOC clustering, custom SLAs, and sovereign hosting.',
    price: 'Custom',
    period: 'annual billing',
    scope: 'Unlimited Facilities · Unlimited Identities',
    bestFor: 'Best for: Global organizations, critical infrastructure, financial institutions, and airports needing full GSOC scale.',
    highlight: false,
    cta: 'Contact Enterprise Sales',
    modulesIncluded: [
      'SOC Dashboard',
      'Cyber Threat Monitoring',
      'Physical Security Management',
      'Identity & Access Control',
      'Incident Response Management',
      'Risk & Vulnerability Management',
      'Compliance & Audit Management',
      'Security Analytics & Intelligence',
      'Emergency Alerts & Notifications'
    ],
    features: [
      'Complete 9-module RedFort platform deployment',
      'Global Security Operations Center (GSOC) multi-tenant clustering',
      'High-throughput event processing (> 100,000 events/sec)',
      'Instant multi-channel emergency broadcast & facility lockdown',
      'Custom hardware connectors (BACnet, OSDP, ONVIF, proprietary PACS)',
      'Air-gapped on-premise or sovereign cloud deployment options',
      '99.999% Uptime SLA with 15-minute emergency response support'
    ]
  }
];

export const RESOURCES_DATA = [
  {
    id: 'res-1',
    category: 'Reports',
    tag: 'Industry Report',
    title: '2026 Cyber-Physical Threat Convergence Outlook',
    description: 'In-depth analysis of over 4,000 enterprise incidents where physical breaches correlated directly with cyber infiltration.',
    readTime: '18 min read',
    date: 'August 2026'
  },
  {
    id: 'res-2',
    category: 'Guides & Whitepapers',
    tag: 'Technical Guide',
    title: 'Architecting a Modern Global Security Operations Center (GSOC)',
    description: 'A blueprint for security leaders unifying physical access control, SIEM ingestion, and SOAR response workflows.',
    readTime: '24 min read',
    date: 'July 2026'
  },
  {
    id: 'res-3',
    category: 'Checklists',
    tag: 'Security Checklist',
    title: 'Enterprise Facility Zero-Trust Access Audit Checklist',
    description: '45-point inspection checklist for verifying biometric access points, server room locks, and visitor badge lifecycles.',
    readTime: '8 min read',
    date: 'June 2026'
  },
  {
    id: 'res-4',
    category: 'Webinars',
    tag: 'On-Demand Webinar',
    title: 'Stopping the Insider Threat: Correlating Badge Swipes with SSH Activity',
    description: 'Watch RedFort threat researchers simulate impossible physical travel attacks and demonstrate automated containment.',
    readTime: '45 min watch',
    date: 'May 2026'
  },
  {
    id: 'res-5',
    category: 'Articles',
    tag: 'Analysis',
    title: 'Why Siloed SIEM and CCTV Systems Create Fatal Blind Spots',
    description: 'How modern threat actors exploit the communication lag between IT security desks and facility guard booths.',
    readTime: '6 min read',
    date: 'April 2026'
  },
  {
    id: 'res-6',
    category: 'Events',
    tag: 'Conference Keynote',
    title: 'Global Cyber-Physical Defense Summit 2026',
    description: 'Keynote presentation on autonomous incident response, digital twins, and AI threat correlation for critical infrastructure.',
    readTime: 'Live Event Archive',
    date: 'March 2026'
  }
];

export const LEADERSHIP_TEAM = [
  {
    name: 'Marcus Vance',
    title: 'Chief Executive Officer & Co-Founder',
    bio: 'Former VP of Security at global defense contractor; 20+ years leading enterprise risk and threat intelligence operations.',
    experience: 'Ex-Aegis Defense, MIT Cyber Lab'
  },
  {
    name: 'Elena Rostova, Ph.D.',
    title: 'Chief Technology Officer & Co-Founder',
    bio: 'Pioneered complex event processing algorithms for critical infrastructure; holds 6 patents in distributed cyber-physical telemetry.',
    experience: 'Ex-Stanford AI, DARPA Security'
  },
  {
    name: 'David Chen',
    title: 'Head of Product & Security Engineering',
    bio: 'Led SIEM and SOAR product development at top enterprise software platforms; passionate about eliminating operator alert fatigue.',
    experience: 'Ex-Splunk, CrowdStrike'
  },
  {
    name: 'Sarah Jenkins',
    title: 'VP of Compliance & Customer Operations',
    bio: 'Former Senior ISO 27001 & SOC 2 Lead Auditor; helped over 200 enterprises achieve zero-finding regulatory certifications.',
    experience: 'Ex-Deloitte Cyber Risk'
  }
];
