const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", () => {
  document.body.classList.toggle("sidebar-closed");

 

});


// ==============================
// ACTIVE NAV ITEM
// ==============================
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
  item.addEventListener('click', function () {
    navItems.forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});


// ==============================
// SAVE CHANGES BUTTON
// ==============================
// ==============================
// SAVE CHANGES BUTTON
// ==============================
const saveBtn = document.querySelector('.btn-primary');

saveBtn.addEventListener('click', function () {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const bio = document.getElementById('bioInput').value.trim();

  if (firstName === '' || lastName === '') {
    alert('Please enter your first and last name.');
    return;
  }

  if (email === '') {
    alert('Please enter your email.');
    return;
  }

  // Save to localStorage
  localStorage.setItem('firstName', firstName);
  localStorage.setItem('lastName', lastName);
  localStorage.setItem('email', email);
  localStorage.setItem('bio', bio);

  // Update profile card immediately
  updateProfileCard(firstName, lastName, bio);

  alert('Profile updated successfully!');
});


// ==============================
// LOAD SAVED DATA ON PAGE OPEN
// ==============================
window.addEventListener('load', function () {
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const email = localStorage.getItem('email');
  const bio = localStorage.getItem('bio');
  const profileImage = localStorage.getItem('profileImage');

  if (profileImage) {
    const avatar = document.querySelector('.profile-avatar');
    avatar.style.backgroundImage = `url(${profileImage})`;
    avatar.style.backgroundSize = 'cover';
    avatar.textContent = '';
  }

  if (firstName) {
    // Update inputs
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('emailInput').value = email;
    document.getElementById('bioInput').value = bio;

    // Update profile card
    updateProfileCard(firstName, lastName, bio);
  }
});



// HELPER — updates profile card

function updateProfileCard(firstName, lastName, bio) {
  const fullName = firstName + ' ' + lastName;
  const initials = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

  document.querySelector('.profile-name').textContent = fullName;
  document.querySelector('.profile-bio').textContent = bio;

  // Only update initials if no photo uploaded
  const avatar = document.querySelector('.profile-avatar');
  if (avatar.style.backgroundImage === '') {
    avatar.textContent = initials;
  }
}



// EDIT AVATAR
const editAvatarBtn = document.querySelector('.btn-outline');

editAvatarBtn.addEventListener('click', function () {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.addEventListener('change', function () {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const avatar = document.querySelector('.profile-avatar');
        avatar.style.backgroundImage = `url(${e.target.result})`;
        avatar.style.backgroundSize = 'cover';
        avatar.textContent = '';
      };
      reader.readAsDataURL(file);
    }
  });

  input.click();
});

// ==============================
// NOTIFICATION CHECKBOXES
// ==============================
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    const label = this.closest('label').querySelector('span').textContent;
    const status = this.checked ? 'enabled' : 'disabled';
    console.log(`${label}: ${status}`);
  });
});