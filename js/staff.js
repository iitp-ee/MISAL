// Staff page: render profile cards in faculty-style layout with one reusable modal
document.addEventListener('DOMContentLoaded', () => {
    const staffMembers = [
        {
            id: 'staff-01',
            name: 'R. Prasad',
            designation: 'Senior Lab Engineer',
            department: 'MISAL Lab Operations, IIT Patna',
            email: 'rprasad@iitp.ac.in',
            phone: '+91-612-302-9201',
            office: 'Instrumentation Wing, Room 102',
            bio: 'Owns RF bench maintenance, periodic calibration schedules, and safety-compliant instrumentation readiness for lab activities.',
            skills: ['Calibration', 'RF Bench Setup', 'Safety Checks'],
            avatar: ['#2f5a4b', '#163328'],
            photo: 'img/staff/ap.jpg'
        },
        {
            id: 'staff-02',
            name: 'A. Singh',
            designation: 'Research Lab Technician',
            department: 'MISAL Lab Operations, IIT Patna',
            email: 'asingh@iitp.ac.in',
            phone: '+91-612-302-9202',
            office: 'Prototype Bay, Room 115',
            bio: 'Supports fabrication flow, PCB test setup, and measurement execution across student and faculty projects.',
            skills: ['Prototyping', 'Testing', 'Fabrication Support'],
            avatar: ['#30668f', '#193f59'],
            photo: 'img/staff/as.jpg'
        },
        {
            id: 'staff-03',
            name: 'N. Kumari',
            designation: 'Academic Program Coordinator',
            department: 'MISAL Lab Operations, IIT Patna',
            email: 'nkumari@iitp.ac.in',
            phone: '+91-612-302-9203',
            office: 'Academic Cell, Room 203',
            bio: 'Coordinates student onboarding, lab access documentation, and inter-department academic communication.',
            skills: ['Scheduling', 'Student Records', 'Coordination'],
            avatar: ['#7f4c6a', '#4e2f42'],
            photo: 'img/staff/nk.jpg'
        },
        {
            id: 'staff-04',
            name: 'D. Tiwari',
            designation: 'Systems and Network Associate',
            department: 'MISAL Lab Operations, IIT Patna',
            email: 'dtiwari@iitp.ac.in',
            phone: '+91-612-302-9204',
            office: 'Compute Wing, Room 106',
            bio: 'Manages simulation servers, secure backups, and software environment maintenance for researchers.',
            skills: ['Lab IT', 'Compute Servers', 'Data Backup'],
            avatar: ['#4b5f8d', '#2e3b58'],
            photo: 'img/staff/dt.jpg'
        },
        {
            id: 'staff-05',
            name: 'M. Ali',
            designation: 'Procurement and Stores Assistant',
            department: 'MISAL Lab Operations, IIT Patna',
            email: 'mali@iitp.ac.in',
            phone: '+91-612-302-9205',
            office: 'Stores Section, Room 009',
            bio: 'Handles procurement workflow, inventory tracking, and consumable availability for uninterrupted lab work.',
            skills: ['Procurement', 'Inventory', 'Vendor Coordination'],
            avatar: ['#7a6a2d', '#4f441d'],
            photo: 'img/staff/na.jpg'
        },
       
    ];

    const staffGrid = document.getElementById('staff-grid');
    if (!staffGrid) return;

    staffMembers.forEach(member => {
        staffGrid.insertAdjacentHTML('beforeend', buildCard(member));
    });

    const modalElement = document.getElementById('staffProfileModal');
    if (!modalElement) return;

    modalElement.addEventListener('show.bs.modal', event => {
        const trigger = event.relatedTarget;
        if (!trigger) return;

        const staffId = trigger.getAttribute('data-staff-id');
        const member = staffMembers.find(item => item.id === staffId);
        if (!member) return;

        fillModal(member);
    });
});

function buildCard(member) {
    const fallbackSrc = createAvatarSvg(member.name, member.avatar[0], member.avatar[1]);
    const photoSrc = member.photo || fallbackSrc;
    return `
        <article class="faculty-card">
            <img src="${photoSrc}" alt="${member.name}" class="faculty-card-image" onerror="this.onerror=null;this.src='${fallbackSrc}'">
            <div class="faculty-card-strip">
                <h5>${member.name}</h5>
                <p>${member.designation}</p>
            </div>
            <div class="faculty-card-body">
                <p><i class="fas fa-envelope"></i> ${member.email}</p>
                <p><i class="fas fa-phone"></i> ${member.phone}</p>
                <button type="button" class="btn btn-sm btn-primary faculty-view-btn" data-staff-id="${member.id}" data-bs-toggle="modal" data-bs-target="#staffProfileModal">View Profile</button>
            </div>
        </article>
    `;
}

function fillModal(member) {
    const modalPhoto = document.getElementById('modalStaffPhoto');
    const modalName = document.getElementById('modalStaffName');
    const modalDesignation = document.getElementById('modalStaffDesignation');
    const modalDepartment = document.getElementById('modalStaffDepartment');
    const modalEmail = document.getElementById('modalStaffEmail');
    const modalPhone = document.getElementById('modalStaffPhone');
    const modalOffice = document.getElementById('modalStaffOffice');
    const modalBio = document.getElementById('modalStaffBio');
    const modalSkills = document.getElementById('modalStaffSkills');
    const fallbackSrc = createAvatarSvg(member.name, member.avatar[0], member.avatar[1], 520, 520, 86);

    modalPhoto.onerror = () => {
        modalPhoto.onerror = null;
        modalPhoto.src = fallbackSrc;
    };
    modalPhoto.src = member.photo || fallbackSrc;
    modalName.textContent = member.name;
    modalDesignation.textContent = member.designation;
    modalDepartment.textContent = member.department;
    modalEmail.textContent = member.email;
    modalPhone.textContent = member.phone;
    modalOffice.textContent = member.office;
    modalBio.textContent = member.bio;
    modalSkills.innerHTML = member.skills.map(tag => `<span>${tag}</span>`).join('');
}

function createAvatarSvg(fullName, fromColor, toColor, width = 420, height = 320, fontSize = 58) {
    const initials = fullName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0].toUpperCase())
        .join('');

    const safeInitials = initials || 'ST';
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="${fromColor}" />
                    <stop offset="100%" stop-color="${toColor}" />
                </linearGradient>
            </defs>
            <rect width="${width}" height="${height}" fill="url(#g)" />
            <circle cx="${width / 2}" cy="${height / 2 - 8}" r="${Math.min(width, height) * 0.24}" fill="rgba(255,255,255,0.14)" />
            <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Roboto, Arial, sans-serif" font-size="${fontSize}" font-weight="700">${safeInitials}</text>
        </svg>
    `.trim();

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
