import React, { useMemo, useState } from "react";
import {
  Activity, Bell, CalendarDays, Check, ChevronDown, Clock3, CreditCard,
  FileText, LayoutDashboard, LogOut, Menu, Search, Settings, ShieldCheck,
  Stethoscope, Users, UserRound, UserPlus, BriefcaseBusiness, ClipboardList,
  CalendarCheck, MessageSquare, Building2, TrendingUp, Wallet, X, Plus,
  ArrowUpRight, CircleHelp, Filter, Download, MoreHorizontal, HeartPulse
} from "lucide-react";

const menus = {
  Administrator: [
    ["Overview", LayoutDashboard], ["Employees", Users], ["Departments", Building2],
    ["Attendance", Clock3], ["Leave Management", CalendarCheck], ["Payroll", Wallet],
    ["Recruitment", BriefcaseBusiness], ["Performance", TrendingUp], ["Reports", FileText],
    ["Settings", Settings]
  ],
  Employee: [
    ["My Dashboard", LayoutDashboard], ["My Profile", UserRound], ["My Attendance", Clock3],
    ["My Shifts", CalendarDays], ["Apply for Leave", CalendarCheck], ["My Payslips", Wallet],
    ["Notifications", Bell]
  ],
  "Patient / Client": [
    ["Patient Dashboard", LayoutDashboard], ["Book Appointment", CalendarDays],
    ["My Appointments", ClipboardList], ["My Profile", UserRound],
    ["Enquiries & Feedback", MessageSquare], ["Hospital Information", HeartPulse]
  ]
};

const employees = [
  { name: "Dr James Mwangi", role: "Medical Officer", dept: "Outpatient", status: "On duty", initials: "JM" },
  { name: "Mary Wanjiku", role: "Registered Nurse", dept: "Maternity", status: "On leave", initials: "MW" },
  { name: "Peter Otieno", role: "Lab Technologist", dept: "Laboratory", status: "On duty", initials: "PO" },
  { name: "Grace Njeri", role: "HR Officer", dept: "Human Resources", status: "On duty", initials: "GN" },
  { name: "David Kiptoo", role: "Pharmacist", dept: "Pharmacy", status: "Off shift", initials: "DK" }
];

const attendance = [
  ["Mon, 09 Nov 2026", "07:02 AM", "07:08 PM", "12h 06m", "Present"],
  ["Tue, 10 Nov 2026", "06:56 AM", "07:01 PM", "12h 05m", "Present"],
  ["Wed, 11 Nov 2026", "07:18 AM", "07:00 PM", "11h 42m", "Late"],
  ["Thu, 12 Nov 2026", "07:00 AM", "07:04 PM", "12h 04m", "Present"],
  ["Fri, 13 Nov 2026", "—", "—", "—", "Scheduled"]
];

function App() {
  const [portal, setPortal] = useState("Administrator");
  const [page, setPage] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  const [appointments, setAppointments] = useState([
    { service: "General consultation", date: "18 Nov 2026", time: "10:30 AM", status: "Pending" },
    { service: "Dental consultation", date: "21 Nov 2026", time: "02:00 PM", status: "Confirmed" }
  ]);
  const [form, setForm] = useState({ name: "", phone: "", service: "General consultation", date: "" });

  const nav = menus[portal];
  const switchPortal = (p) => {
    setPortal(p);
    setPage(menus[p][0][0]);
    setMobileOpen(false);
  };
  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const title = page;
  const subtitle = portal === "Administrator"
    ? "Hospital workforce overview and management"
    : portal === "Employee"
      ? "Your personal employment information"
      : "Your hospital services and appointment information";

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Stethoscope size={23}/></div>
          <div><strong>ST TERESA</strong><span>HOSPITAL HRMS</span></div>
          <button className="mobile-close icon-btn" onClick={() => setMobileOpen(false)}><X size={19}/></button>
        </div>
        <div className="portal-label">WORKSPACE</div>
        <div className="portal-switch">
          <span className="portal-dot"></span>
          <select value={portal} onChange={e => switchPortal(e.target.value)} aria-label="Choose portal">
            {Object.keys(menus).map(p => <option key={p}>{p}</option>)}
          </select>
          <ChevronDown size={15}/>
        </div>
        <div className="nav-caption">MENU</div>
        <nav className="side-nav">
          {nav.map(([label, Icon]) => (
            <button key={label} className={`nav-item ${page === label ? "active" : ""}`}
              onClick={() => { setPage(label); setMobileOpen(false); }}>
              <Icon size={18}/><span>{label}</span>
              {label === "Notifications" && <i className="nav-count">3</i>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><CircleHelp size={18}/></div>
            <strong>Need assistance?</strong>
            <p>Contact the hospital support team for help.</p>
            <button onClick={() => notify("Support contact: support@stteresahospital.co.ke")}>Contact support <ArrowUpRight size={14}/></button>
          </div>
          <div className="profile-mini">
            <div className="avatar avatar-orange">{portal === "Patient / Client" ? "PC" : portal === "Employee" ? "MW" : "SA"}</div>
            <div className="profile-copy"><strong>{portal === "Patient / Client" ? "Patient Account" : portal === "Employee" ? "Mary Wanjiku" : "System Administrator"}</strong><span>{portal}</span></div>
            <MoreHorizontal size={18} className="muted"/>
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="scrim" onClick={() => setMobileOpen(false)} />}
      <main className="main-area">
        <header className="topbar">
          <div className="top-left">
            <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={21}/></button>
            <div className="breadcrumb">St Teresa Hospital <span>/</span> <b>{page}</b></div>
          </div>
          <div className="top-actions">
            <label className="search-box"><Search size={16}/><input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}/><kbd>⌘ K</kbd></label>
            <button className="icon-btn notification-btn" onClick={() => notify("You are all caught up with notifications.")}><Bell size={19}/><i></i></button>
            <div className="top-avatar">{portal === "Employee" ? "MW" : portal === "Patient / Client" ? "PC" : "SA"}</div>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div><div className="eyebrow">{portal.toUpperCase()} PORTAL</div><h1>{title}</h1><p>{subtitle}</p></div>
            <div className="heading-actions">
              <button className="btn btn-light" onClick={() => notify("Report export is a prototype action.")}><Download size={16}/> Export</button>
              {portal === "Administrator" && <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={17}/> Add employee</button>}
              {portal === "Patient / Client" && page === "Book Appointment" && <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={17}/> Request appointment</button>}
            </div>
          </div>

          {portal === "Administrator" && <AdminPage page={page} search={search} onAdd={() => setShowModal(true)} notify={notify}/>}
          {portal === "Employee" && <EmployeePage page={page} notify={notify}/>}
          {portal === "Patient / Client" && <PatientPage page={page} appointments={appointments} onBook={() => setShowModal(true)} notify={notify}/>}
        </div>
        <footer className="footer"><span>© 2026 St Teresa Hospital. Prototype interface.</span><span>Trusted care. Here for you.</span></footer>
      </main>

      {showModal && <Modal portal={portal} form={form} setForm={setForm} onClose={() => setShowModal(false)}
        onSubmit={() => {
          if (portal === "Patient / Client") {
            if (!form.name || !form.phone || !form.date) return notify("Please complete the required fields.");
            setAppointments([...appointments, { service: form.service, date: form.date, time: "To be confirmed", status: "Pending" }]);
            setForm({ name: "", phone: "", service: "General consultation", date: "" });
            setPage("My Appointments");
            notify("Appointment request added to this prototype.");
          } else notify("Employee form submitted in prototype mode.");
          setShowModal(false);
        }}/>}
      {toast && <div className="toast"><Check size={17}/>{toast}</div>}
    </div>
  );
}

function AdminPage({ page, search, onAdd, notify }) {
  if (page === "Employees") {
    const filtered = employees.filter(e => `${e.name} ${e.role} ${e.dept}`.toLowerCase().includes(search.toLowerCase()));
    return <><div className="section-toolbar"><div><h2>Employee directory</h2><p>Manage hospital staff profiles and employment details.</p></div><button className="btn btn-primary" onClick={onAdd}><UserPlus size={16}/> Add employee</button></div>
      <div className="table-card"><div className="table-top"><strong>All employees <span className="count-pill">263</span></strong><button className="btn btn-light btn-sm" onClick={() => notify("Filters are available in the full application.")}><Filter size={15}/> Filters</button></div>
      <div className="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>POSITION</th><th>DEPARTMENT</th><th>STATUS</th><th></th></tr></thead><tbody>
        {filtered.map(e => <tr key={e.name}><td><div className="person-cell"><div className="avatar">{e.initials}</div><strong>{e.name}</strong></div></td><td>{e.role}</td><td>{e.dept}</td><td><Status value={e.status}/></td><td><button className="icon-btn" onClick={() => notify(`${e.name} profile preview`)}><MoreHorizontal size={18}/></button></td></tr>)}
      </tbody></table></div></div></>;
  }
  if (page === "Attendance") return <><Stats items={[["Present today","218","83% of workforce",Users],["Absent","12","Today",Clock3],["Late arrivals","8","Today",Activity],["On approved leave","16","Across departments",CalendarCheck]]}/><Panel title="Today's attendance" action="View all" onAction={() => notify("Attendance register opened in prototype.")}><SimpleTable headers={["EMPLOYEE","DEPARTMENT","CLOCK IN","STATUS"]} rows={employees.slice(0,4).map((e,i)=>[e.name,e.dept,["07:02 AM","06:56 AM","07:18 AM","08:01 AM"][i],e.status])}/></Panel></>;
  if (page === "Leave Management") return <><Stats items={[["Pending requests","14","Awaiting review",CalendarCheck],["Approved this month","32","November 2026",Check],["On leave today","16","Across departments",Users],["Rejected","3","This month",X]]}/><Panel title="Recent leave requests" action="Review requests" onAction={() => notify("Leave review queue selected.")}><SimpleTable headers={["EMPLOYEE","LEAVE TYPE","DATES","STATUS"]} rows={[["Mary Wanjiku","Annual Leave","12–16 Nov 2026","Pending"],["Peter Otieno","Sick Leave","10 Nov 2026","Approved"],["Grace Njeri","Compassionate","06 Nov 2026","Approved"]]}/></Panel></>;
  if (page === "Payroll") return <><Stats items={[["Gross payroll","KSh 18.4M","November 2026",Wallet],["Deductions","KSh 3.2M","Illustrative",CreditCard],["Net payroll","KSh 15.2M","Illustrative",TrendingUp],["Employees paid","247","Of 263 employees",Users]]}/><Panel title="Payroll summary" action="Open payroll" onAction={() => notify("Payroll module selected.")}><div className="notice"><ShieldCheck size={19}/><span>Payroll figures are illustrative. Verify current Kenyan PAYE, NSSF, SHIF and Affordable Housing Levy rules before calculating or processing payroll.</span></div><SimpleTable headers={["PAYROLL PERIOD","EMPLOYEES","GROSS PAY","NET PAY","STATUS"]} rows={[["November 2026","263","KSh 18,400,000","KSh 15,200,000","Draft"],["October 2026","258","KSh 17,900,000","KSh 14,800,000","Paid"]]}/></Panel></>;
  if (page === "Departments") return <div className="card-grid">{[["Outpatient","42 employees"],["Maternity","36 employees"],["Laboratory","18 employees"],["Pharmacy","14 employees"],["Nursing","78 employees"],["Human Resources","8 employees"]].map(([n,c])=><div className="department-card" key={n}><div className="dept-icon"><Building2 size={20}/></div><h3>{n}</h3><p>{c}</p><button onClick={() => notify(`${n} department selected`)}>View department <ArrowUpRight size={14}/></button></div>)}</div>;
  if (page === "Recruitment") return <><Stats items={[["Open vacancies","12","Across departments",BriefcaseBusiness],["Applications","86","Received this month",FileText],["Shortlisted","18","Awaiting interviews",Users],["Interviews","7","Scheduled",CalendarDays]]}/><Panel title="Active vacancies" action="Create vacancy" onAction={() => notify("Vacancy form is planned for the next prototype iteration.")}><SimpleTable headers={["POSITION","DEPARTMENT","APPLICANTS","CLOSING DATE","STATUS"]} rows={[["Registered Nurse","Nursing","24","30 Nov 2026","Open"],["Medical Officer","Outpatient","18","25 Nov 2026","Open"],["Accounts Assistant","Finance","12","28 Nov 2026","Open"]]}/></Panel></>;
  if (page === "Performance") return <><Stats items={[["Reviews due","28","This quarter",ClipboardList],["Completed","74","This quarter",Check],["Average score","86%","Illustrative",TrendingUp],["Development plans","19","Active",Activity]]}/><Panel title="Performance review activity"><SimpleTable headers={["EMPLOYEE","DEPARTMENT","REVIEW PERIOD","STATUS"]} rows={[["Dr James Mwangi","Outpatient","Q4 2026","In progress"],["Mary Wanjiku","Maternity","Q4 2026","Pending"],["Peter Otieno","Laboratory","Q4 2026","Completed"]]}/></Panel></>;
  if (page === "Reports") return <><div className="report-grid"><div className="report-card"><Activity/><h3>Workforce report</h3><p>Headcount, staffing and department distribution.</p><button onClick={() => notify("Report preview is a prototype action.")}>Open report <ArrowUpRight size={14}/></button></div><div className="report-card"><Clock3/><h3>Attendance report</h3><p>Daily attendance, lateness and overtime.</p><button onClick={() => notify("Report preview is a prototype action.")}>Open report <ArrowUpRight size={14}/></button></div><div className="report-card"><Wallet/><h3>Payroll report</h3><p>Payroll summaries and deduction breakdowns.</p><button onClick={() => notify("Report preview is a prototype action.")}>Open report <ArrowUpRight size={14}/></button></div></div></>;
  if (page === "Settings") return <Panel title="System settings"><div className="settings-row"><div><strong>Portal appearance</strong><p>St Teresa dark blue and orange theme</p></div><span className="theme-swatches"><i></i><i></i></span></div><div className="settings-row"><div><strong>Role-based access</strong><p>Manage user roles and permissions</p></div><button className="btn btn-light btn-sm" onClick={() => notify("Role management is planned for backend integration.")}>Manage roles</button></div></Panel>;
  return <><Stats items={[["Total employees","263","+8 this quarter",Users],["Present today","218","83% attendance",CalendarCheck],["On leave","16","Across departments",Clock3],["Open vacancies","12","Recruitment",BriefcaseBusiness]]}/>
    <div className="dashboard-grid"><Panel title="Attendance overview" subtitle="Workforce attendance today"><div className="attendance-chart"><div className="donut"><div><strong>83%</strong><span>Present</span></div></div><div className="chart-legend"><span><i className="legend-blue"></i>Present <b>218</b></span><span><i className="legend-orange"></i>On leave <b>16</b></span><span><i className="legend-grey"></i>Absent <b>29</b></span></div></div></Panel>
      <Panel title="Department distribution" subtitle="Employees by department"><div className="bar-list">{[["Nursing",78,90],["Outpatient",42,65],["Maternity",36,55],["Laboratory",18,35],["Pharmacy",14,25]].map(([n,v,w])=><div className="bar-row" key={n}><div><span>{n}</span><b>{v}</b></div><div className="bar-track"><i style={{width:`${w}%`}}/></div></div>)}</div></Panel></div>
    <Panel title="Recent employee activity" action="View directory" onAction={() => notify("Select Employees from the sidebar to open the directory.")}><SimpleTable headers={["EMPLOYEE","POSITION","DEPARTMENT","STATUS"]} rows={employees.slice(0,4).map(e=>[e.name,e.role,e.dept,e.status])}/></Panel>
  </>;
}

function EmployeePage({ page, notify }) {
  if (page === "My Attendance") return <><Stats items={[["Days present","19","This month",CalendarCheck],["Days absent","1","This month",Clock3],["Late arrivals","2","This month",Activity],["Overtime","8.5 hrs","This month",TrendingUp]]}/><Panel title="My attendance history" subtitle="Personal attendance records for the signed-in employee"><SimpleTable headers={["DATE","CLOCK IN","CLOCK OUT","HOURS","STATUS"]} rows={attendance}/></Panel></>;
  if (page === "My Payslips") return <><div className="payslip-highlight"><div><span>November 2026 · Net salary</span><h2>KSh 62,450.00</h2><small>Illustrative sample payslip — not an actual payment</small></div><button className="btn btn-primary" onClick={() => notify("Payslip PDF download will be connected to the backend.")}><Download size={16}/> Download payslip</button></div><div className="dashboard-grid"><Panel title="Earnings"><MoneyRow label="Basic salary" value="KSh 70,000.00"/><MoneyRow label="House allowance" value="KSh 10,000.00"/><MoneyRow label="Other allowances" value="KSh 2,500.00"/><MoneyRow label="Gross pay" value="KSh 82,500.00" total/></Panel><Panel title="Deductions"><MoneyRow label="PAYE" value="KSh 9,000.00"/><MoneyRow label="NSSF" value="KSh 4,200.00"/><MoneyRow label="SHIF" value="KSh 1,650.00"/><MoneyRow label="Housing levy" value="KSh 825.00"/><MoneyRow label="Total deductions" value="KSh 15,675.00" total/></Panel></div><div className="notice"><ShieldCheck size={18}/> Figures are examples only. Actual statutory deductions must use current official Kenyan rates and the employee's applicable tax circumstances.</div><Panel title="Previous payslips"><SimpleTable headers={["PERIOD","GROSS PAY","NET PAY","STATUS",""]} rows={[["October 2026","KSh 82,500","KSh 62,450","Paid","View"],["September 2026","KSh 82,500","KSh 62,100","Paid","View"]]}/></Panel></>;
  if (page === "My Shifts") return <Panel title="My shift schedule" subtitle="Upcoming assigned shifts"><SimpleTable headers={["DATE","SHIFT","START","END","DEPARTMENT"]} rows={[["13 Nov 2026","Day Shift","07:00 AM","07:00 PM","Maternity"],["14 Nov 2026","Day Shift","07:00 AM","07:00 PM","Maternity"],["15 Nov 2026","Rest Day","—","—","Maternity"],["16 Nov 2026","Night Shift","07:00 PM","07:00 AM","Maternity"]]}/></Panel>;
  if (page === "Apply for Leave") return <Panel title="Leave application"><div className="form-grid"><Field label="Leave type"><select><option>Annual Leave</option><option>Sick Leave</option><option>Compassionate Leave</option><option>Unpaid Leave</option></select></Field><Field label="Start date"><input type="date"/></Field><Field label="End date"><input type="date"/></Field><Field label="Reason"><textarea placeholder="Provide a brief reason..."/></Field></div><button className="btn btn-primary" onClick={() => notify("Leave application saved in prototype mode.")}>Submit application</button></Panel>;
  if (page === "My Profile") return <Panel title="My employee profile"><div className="profile-banner"><div className="avatar avatar-large">MW</div><div><h2>Mary Wanjiku</h2><p>Registered Nurse · Maternity Department</p><span className="status status-green">Active employee</span></div></div><div className="detail-grid"><Detail label="Employee number" value="STH-EMP-0248"/><Detail label="Work email" value="mary.wanjiku@stteresahospital.co.ke"/><Detail label="Employment type" value="Permanent"/><Detail label="Date joined" value="12 March 2022"/></div></Panel>;
  if (page === "Notifications") return <Panel title="Notifications"><Notification title="Shift reminder" body="Your next day shift is scheduled for tomorrow at 7:00 AM." time="Today, 9:15 AM"/><Notification title="Leave request update" body="Your annual leave request is awaiting supervisor review." time="Yesterday, 3:40 PM"/><Notification title="Payslip available" body="Your October payslip is available in My Payslips." time="01 Nov 2026"/></Panel>;
  return <><div className="welcome-card"><div><span className="eyebrow light">EMPLOYEE SELF-SERVICE</span><h2>Good morning, Mary <span>☀️</span></h2><p>Here is your personal employment overview for today.</p></div><div className="welcome-icon"><UserRound size={42}/></div></div><Stats items={[["Attendance this month","19 days","Personal record",CalendarCheck],["Leave balance","12 days","Annual leave",Clock3],["Next shift","07:00 AM","Today · Maternity",CalendarDays],["Latest payslip","KSh 62,450","November · Sample",Wallet]]}/><div className="dashboard-grid"><Panel title="Today's shift"><div className="shift-panel"><div className="shift-time"><strong>07:00 AM</strong><span>Start</span></div><div className="shift-line"><i/></div><div className="shift-time"><strong>07:00 PM</strong><span>Finish</span></div></div><p className="muted small">Day Shift · Maternity Department</p><button className="btn btn-primary" onClick={() => notify("Clock-in is a demo action; no attendance has been recorded.")}>Clock in</button></Panel><Panel title="Quick actions"><div className="quick-actions"><button onClick={() => notify("Choose Apply for Leave from the sidebar.")}><CalendarCheck/>Apply for leave</button><button onClick={() => notify("Choose My Payslips from the sidebar.")}><Wallet/>View payslip</button><button onClick={() => notify("Choose My Attendance from the sidebar.")}><Clock3/>Attendance history</button></div></Panel></div></>;
}

function PatientPage({ page, appointments, onBook, notify }) {
  if (page === "Book Appointment") return <Panel title="Request an appointment" subtitle="Submit your preferred service and date. The hospital will confirm availability."><div className="form-grid"><Field label="Full name"><input placeholder="Enter your full name"/></Field><Field label="Phone number"><input placeholder="+254 7XX XXX XXX"/></Field><Field label="Service"><select><option>General consultation</option><option>Dental consultation</option><option>Maternity services</option><option>Laboratory services</option><option>Pharmacy</option></select></Field><Field label="Preferred date"><input type="date"/></Field></div><button className="btn btn-primary" onClick={onBook}>Continue appointment request</button><p className="muted small">This prototype does not transmit or book real appointments.</p></Panel>;
  if (page === "My Appointments") return <Panel title="My appointment requests" action="Request appointment" onAction={onBook}><div className="appointment-list">{appointments.map((a,i)=><div className="appointment-row" key={i}><div className="appointment-icon"><CalendarDays/></div><div className="appointment-info"><strong>{a.service}</strong><span>{a.date} · {a.time}</span></div><Status value={a.status}/></div>)}</div></Panel>;
  if (page === "My Profile") return <Panel title="My profile"><div className="profile-banner"><div className="avatar avatar-large">PC</div><div><h2>Patient / Client</h2><p>Portal account</p><span className="status status-green">Account active · Demo</span></div></div><div className="notice">Your personal information will be managed separately from employee HR records.</div></Panel>;
  if (page === "Enquiries & Feedback") return <Panel title="Contact the hospital" subtitle="Send a question or feedback to the hospital team."><div className="form-grid"><Field label="Full name"><input placeholder="Your name"/></Field><Field label="Phone or email"><input placeholder="Contact details"/></Field><Field label="Subject"><input placeholder="How can we help?"/></Field><Field label="Message"><textarea placeholder="Write your message..."/></Field></div><button className="btn btn-primary" onClick={() => notify("Enquiry submitted in prototype mode.")}>Submit enquiry</button></Panel>;
  if (page === "Hospital Information") return <div className="info-grid"><div className="info-card"><HeartPulse/><h3>Our hospital</h3><p>St Teresa Hospital provides healthcare services with a commitment to trusted, patient-centred care.</p></div><div className="info-card"><Clock3/><h3>Availability</h3><p>Contact the hospital to confirm service hours and appointment availability.</p></div><div className="info-card"><MessageSquare/><h3>Get in touch</h3><p>Use the Enquiries & Feedback section to send a message to the hospital.</p></div></div>;
  return <><div className="patient-hero"><div><span className="eyebrow light">ST TERESA HOSPITAL</span><h2>Your care journey, made simpler.</h2><p>Request appointments, check appointment updates and contact our team from one place.</p><button className="btn btn-primary" onClick={onBook}><CalendarDays size={16}/> Request an appointment</button></div><div className="hero-symbol"><HeartPulse size={74}/></div></div><div className="dashboard-grid"><Panel title="Upcoming appointments"><div className="appointment-list">{appointments.slice(0,2).map((a,i)=><div className="appointment-row" key={i}><div className="appointment-icon"><CalendarDays/></div><div className="appointment-info"><strong>{a.service}</strong><span>{a.date} · {a.time}</span></div><Status value={a.status}/></div>)}</div></Panel><Panel title="Patient portal services"><div className="quick-actions"><button onClick={onBook}><CalendarDays/>Book appointment</button><button onClick={() => notify("Open My Appointments from the sidebar.")}><ClipboardList/>View appointments</button><button onClick={() => notify("Open Enquiries & Feedback from the sidebar.")}><MessageSquare/>Send an enquiry</button></div></Panel></div></>;
}

function Stats({ items }) {
  return <div className="stats-grid">{items.map(([label,value,sub,Icon])=><div className="stat-card" key={label}><div className="stat-top"><span>{label}</span><div className="stat-icon"><Icon size={18}/></div></div><strong>{value}</strong><small>{sub}</small></div>)}</div>;
}
function Panel({ title, subtitle, action, onAction, children }) {
  return <section className="panel"><div className="panel-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button className="text-action" onClick={onAction}>{action}<ArrowUpRight size={14}/></button>}</div>{children}</section>;
}
function SimpleTable({ headers, rows }) {
  return <div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{j === r.length-1 && ["Present","On duty","On leave","Off shift","Late","Scheduled","Pending","Approved","Paid","Open","Draft","Confirmed","Completed"].includes(v) ? <Status value={v}/> : v}</td>)}</tr>)}</tbody></table></div>;
}
function Status({ value }) {
  const cls = ["Present","On duty","Approved","Paid","Confirmed","Completed","Active"].includes(value) ? "green" :
    ["Pending","Late","Scheduled","Draft","On leave","Open"].includes(value) ? "orange" : "grey";
  return <span className={`status status-${cls}`}><i/>{value}</span>;
}
function Field({ label, children }) { return <label className="field"><span>{label}</span>{children}</label>; }
function MoneyRow({ label, value, total }) { return <div className={`money-row ${total ? "money-total" : ""}`}><span>{label}</span><strong>{value}</strong></div>; }
function Detail({ label, value }) { return <div className="detail-item"><span>{label}</span><strong>{value}</strong></div>; }
function Notification({ title, body, time }) { return <div className="notification-row"><div className="notification-bullet"/><div><strong>{title}</strong><p>{body}</p><small>{time}</small></div></div>; }

function Modal({ portal, form, setForm, onClose, onSubmit }) {
  const isPatient = portal === "Patient / Client";
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><div className="modal">
    <div className="modal-head"><div><h2>{isPatient ? "Request an appointment" : "Add employee"}</h2><p>{isPatient ? "Enter your details and preferred date." : "Create a staff record (demo form)."}</p></div><button className="icon-btn" onClick={onClose}><X/></button></div>
    <div className="modal-body">
      <Field label={isPatient ? "Full name *" : "Employee full name"}><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name"/></Field>
      <Field label={isPatient ? "Phone number *" : "Work email"}><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder={isPatient ? "+254 7XX XXX XXX" : "name@stteresahospital.co.ke"}/></Field>
      {isPatient && <><Field label="Service"><select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}><option>General consultation</option><option>Dental consultation</option><option>Maternity services</option><option>Laboratory services</option></select></Field><Field label="Preferred date *"><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></Field></>}
    </div>
    <div className="modal-actions"><button className="btn btn-light" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={onSubmit}>{isPatient ? "Submit request" : "Save employee"}</button></div>
  </div></div>;
}

export default App;