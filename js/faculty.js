// Faculty page: render demo profiles and reuse one Bootstrap modal for all cards
document.addEventListener('DOMContentLoaded', () => {
    const facultyMembers = [
        {
            id: 'hod-01',
            category: 'head',
            name: 'Prof. Arvind Kumar',
            designation: 'Professor and Head of Department',
            department: 'Department of Electrical Engineering, IIT Patna',
            email: 'arvind.kumar@iitp.ac.in',
            phone: '+91-612-302-9101',
            office: 'EE Block, Room 312',
            bio: 'Leads the MISAL Lab research program focused on high-efficiency RF front-end architectures, microwave passive miniaturization, and scalable hardware validation for communication platforms.',
            interests: ['Microwave Circuits', 'RF Front-End', 'GaN Power Devices', 'High-Frequency Characterization'],
            image: 'img/Faculty/ak.jpg',
            avatar: ['#176087', '#0c3a56']
        },
        {
            id: 'fac-01',
            category: 'faculty',
            name: 'Dr. S. K. Mishra',
            designation: 'Associate Professor',
            department: 'Department of Electrical Engineering, IIT Patna',
            email: 'skmishra@iitp.ac.in',
            phone: '+91-612-302-9102',
            office: 'EE Block, Room 301',
            bio: 'Works on reconfigurable RF subsystem design and nonlinear modeling methods used for robust circuit co-design and implementation workflows.',
            interests: ['Reconfigurable RF', 'Device Modeling', 'EM-Circuit Co-design'],
            image: 'img/Faculty/sk.jpg',
            avatar: ['#255f99', '#15395c']
        },
        {
            id: 'fac-02',
            category: 'faculty',
            name: 'Dr. R. Verma',
            designation: 'Assistant Professor',
            department: 'Department of Electrical Engineering, IIT Patna',
            email: 'rverma@iitp.ac.in',
            phone: '+91-612-302-9103',
            office: 'EE Block, Room 316',
            bio: 'Researches millimeter-wave antennas, wideband feed networks, and prototype-level validation for emerging wireless deployments.',
            interests: ['Millimeter Wave', 'Antenna Arrays', 'Propagation Studies'],
            image: 'img/Faculty/rv.jpg',
            avatar: ['#367967', '#234d43']
        },
        {
            id: 'fac-03',
            category: 'faculty',
            name: 'Dr. Neha Verma',
            designation: 'Assistant Professor',
            department: 'Department of Electrical Engineering, IIT Patna',
            email: 'neha.verma@iitp.ac.in',
            phone: '+91-612-302-9104',
            office: 'EE Block, Room 320',
            bio: 'Develops AI-assisted signal analytics for RF sensing systems and contributes to automated measurement and optimization pipelines.',
            interests: ['Signal Analytics', 'AI for RF', 'Instrumentation Automation'],
            image: 'img/Faculty/nv.jpg',
            avatar: ['#4f4f8f', '#2f2f59']
        },
        {
            id: 'fac-04',
            category: 'faculty',
            name: 'Dr. P. Srivastava',
            designation: 'Assistant Professor',
            department: 'Department of Electrical Engineering, IIT Patna',
            email: 'psrivastava@iitp.ac.in',
            phone: '+91-612-302-9105',
            office: 'EE Block, Room 307',
            bio: 'Focuses on optimization-driven RF system design, robust estimation methods, and applied communication signal processing problems.',
            interests: ['Optimization', 'Statistical Signal Processing', 'Wireless Systems'],
            image: 'img/Faculty/ps.jpg',
            avatar: ['#985f22', '#6f3f10']
        },
        {
            id: 'fac-05',
            category: 'faculty',
            name: 'Dr. K. N. Rao',
            designation: 'Assistant Professor',
            department: 'Department of Electrical Engineering, IIT Patna',
            email: 'knrao@iitp.ac.in',
            phone: '+91-612-302-9106',
            office: 'EE Block, Room 328',
            bio: 'Works on RFIC layout-aware design methodologies, parasitic-aware synthesis, and fast prototyping of mixed-frequency building blocks.',
            interests: ['RFIC Design', 'Layout Optimization', 'Mixed-Signal Hardware'],
            image: 'img/Faculty/kn.jpg',
            avatar: ['#6d4b8e', '#45335f']
        },
        {
            id: 'adj-01',
            category: 'adjunct',
            name: 'Prof. M. Tiwari',
            designation: 'Adjunct Professor',
            department: 'Collaborative Faculty, MISAL Lab',
            email: 'mtiwari@iitp.ac.in',
            phone: '+91-612-302-9150',
            office: 'Research Extension Wing',
            bio: 'Supports interdisciplinary projects involving communication architectures and lab-to-industry translation of prototype systems.',
            interests: ['System Architecture', 'Industry Collaboration', 'Technology Translation'],
            image: 'img/Faculty/mt.jpg',
            avatar: ['#2f7d94', '#1c4f63']
        },
        {
            id: 'adj-02',
            category: 'adjunct',
            name: 'Dr. A. Chaturvedi',
            designation: 'Adjunct Faculty',
            department: 'Collaborative Faculty, MISAL Lab',
            email: 'achaturvedi@iitp.ac.in',
            phone: '+91-612-302-9151',
            office: 'Applied Electronics Wing',
            bio: 'Contributes to practical RF curriculum, project mentorship, and testbed-oriented student training in embedded and VLSI-linked domains.',
            interests: ['Applied RF Training', 'Embedded Systems', 'VLSI Interfaces'],
            image: 'img/Faculty/ac.jpg',
            avatar: ['#7a6a2d', '#4f441d']
        },
        {
            id: 'adj-03',
            category: 'adjunct',
            name: 'Dr. R. K. Jha',
            designation: 'Adjunct Faculty',
            department: 'Collaborative Faculty, MISAL Lab',
            email: 'rkjha@iitp.ac.in',
            phone: '+91-612-302-9152',
            office: 'Research Annex, Room 204',
            bio: 'Mentors applied antenna projects and supports prototype-to-field validation activities with focus on practical deployment constraints.',
            interests: ['Antenna Engineering', 'Prototype Validation', 'Applied Electromagnetics'],
            image: 'img/Faculty/rk.jpg',
            avatar: ['#1f6a86', '#12465b']
        },
        {
            id: 'adj-04',
            category: 'adjunct',
            name: 'Prof. D. Prakash',
            designation: 'Adjunct Professor',
            department: 'Collaborative Faculty, MISAL Lab',
            email: 'dprakash@iitp.ac.in',
            phone: '+91-612-302-9153',
            office: 'Advanced Systems Wing, Room 118',
            bio: 'Contributes to computational electromagnetics modules and guides high-frequency simulation frameworks for thesis students.',
            interests: ['Computational EM', 'RF Simulation', 'Numerical Methods'],
            image: 'img/Faculty/dp.jpg',
            avatar: ['#3d5d9a', '#223760']
        },
        {
            id: 'adj-05',
            category: 'adjunct',
            name: 'Dr. V. Kumar',
            designation: 'Adjunct Faculty',
            department: 'Collaborative Faculty, MISAL Lab',
            email: 'vkumar@iitp.ac.in',
            phone: '+91-612-302-9154',
            office: 'Innovation Block, Room 109',
            bio: 'Supports cross-domain student projects combining communication algorithms, embedded implementation, and rapid lab testing.',
            interests: ['Communication Systems', 'Embedded Prototyping', 'Lab Testbeds'],
            image: 'img/Faculty/vk.jpg',
            avatar: ['#7d4b63', '#502f41']
        }
    ];

    const containerMap = {
        head: document.getElementById('faculty-head-grid'),
        faculty: document.getElementById('faculty-main-grid'),
        adjunct: document.getElementById('faculty-adjunct-grid')
    };

    facultyMembers.forEach(member => {
        const target = containerMap[member.category];
        if (!target) return;
        target.insertAdjacentHTML('beforeend', buildCard(member));
    });

    const modalElement = document.getElementById('facultyProfileModal');
    if (!modalElement) return;

    modalElement.addEventListener('show.bs.modal', event => {
        const trigger = event.relatedTarget;
        if (!trigger) return;

        const memberId = trigger.getAttribute('data-member-id');
        const member = facultyMembers.find(item => item.id === memberId);
        if (!member) return;

        fillModal(member);
    });
});

function buildCard(member) {
    const avatarSrc = member.image || createAvatarSvg(member.name, member.avatar[0], member.avatar[1]);
    return `
        <article class="faculty-card">
            <img src="${avatarSrc}" alt="${member.name}" class="faculty-card-image">
            <div class="faculty-card-strip">
                <h5>${member.name}</h5>
                <p>${member.designation}</p>
            </div>
            <div class="faculty-card-body">
                <p><i class="fas fa-envelope"></i> ${member.email}</p>
                <p><i class="fas fa-phone"></i> ${member.phone}</p>
                <button type="button" class="btn btn-sm btn-primary faculty-view-btn" data-member-id="${member.id}" data-bs-toggle="modal" data-bs-target="#facultyProfileModal">View Profile</button>
            </div>
        </article>
    `;
}

function fillModal(member) {
    const modalPhoto = document.getElementById('modalFacultyPhoto');
    const modalName = document.getElementById('modalFacultyName');
    const modalDesignation = document.getElementById('modalFacultyDesignation');
    const modalDepartment = document.getElementById('modalFacultyDepartment');
    const modalEmail = document.getElementById('modalFacultyEmail');
    const modalPhone = document.getElementById('modalFacultyPhone');
    const modalBio = document.getElementById('modalFacultyBio');
    const modalInterests = document.getElementById('modalFacultyInterests');

    modalPhoto.src = member.image || createAvatarSvg(member.name, member.avatar[0], member.avatar[1], 520, 520, 86);
    modalName.textContent = member.name;
    modalDesignation.textContent = member.designation;
    modalDepartment.textContent = member.department;
    modalEmail.textContent = member.email;
    modalPhone.textContent = member.phone;
    modalBio.textContent = member.bio;
    modalInterests.innerHTML = member.interests.map(tag => `<span>${tag}</span>`).join('');
}

function createAvatarSvg(fullName, fromColor, toColor, width = 420, height = 320, fontSize = 58) {
    const initials = fullName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0].toUpperCase())
        .join('');

    const safeInitials = initials || 'FM';
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
