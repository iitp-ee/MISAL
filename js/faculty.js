// Faculty page: render demo profiles and reuse one Bootstrap modal for all cards
document.addEventListener('DOMContentLoaded', () => {
    const facultyMembers = [
        {
            id: 'hod-01',
            category: 'head',
            name: 'Dr. Jagannath Malik',
            designation: 'Assistant Professor',
            department: 'Department of Electrical Engineering',
            email: 'malik[*AT]iitp.ac.in',
            phone: '+91-6115-233-(8)973',
            office: 'EE Block, Room 422',
            bio: 'Antennas, Multifunctional Metamaterials, Electromagnetic Sensors, EM-based biosensors',
            // interests: ['Microwave Circuits', 'RF Front-End', 'GaN Power Devices', 'High-Frequency Characterization'],
            image: 'img/Faculty/Jagannath.jpg',
            avatar: ['#176087', '#0c3a56']
        },
        {
            id: 'fac-01',
            category: 'faculty',
            name: 'Somanath Pradhan',
            designation: 'Assistant Professor',
            department: 'Department of Electrical Engineering',
            email: 'pradhans[*AT]iitp.ac.in',
            phone: '+91-612-302-9102',
            office: 'EE Block, Room 423',
            bio: 'Audio and Acoustical Signal Processing Active Noise Control Acoustic Metamaterials Signal Processing for Assistive Listening Devices Adaptive Signal Processing Applications of AI/ML',
            // interests: ['Reconfigurable RF', 'Device Modeling', 'EM-Circuit Co-design'],
            image: 'img/Faculty/Somanath-Pradhan.jpg',
            avatar: ['#255f99', '#15395c']
        },
        
       
       
       
        // {
        //     id: 'adj-01',
        //     category: 'adjunct',
        //     name: 'Prof. M. Tiwari',
        //     designation: 'Adjunct Professor',
        //     department: 'Collaborative Faculty, MISAL Lab',
        //     email: 'mtiwari@iitp.ac.in',
        //     phone: '+91-612-302-9150',
        //     office: 'Research Extension Wing',
        //     bio: 'Supports interdisciplinary projects involving communication architectures and lab-to-industry translation of prototype systems.',
        //     interests: ['System Architecture', 'Industry Collaboration', 'Technology Translation'],
        //     image: 'img/Faculty/mt.jpg',
        //     avatar: ['#2f7d94', '#1c4f63']
        // },
       
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

    Object.values(containerMap).forEach(container => {
        if (!container) return;
        container.classList.toggle('faculty-grid-single', container.children.length === 1);
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
