const { faker } = require('@faker-js/faker');

// Generate a single fake user from any country
function generateUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const gender = faker.helpers.arrayElement(['male', 'female']);

  // Generate email based on name
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();

  // Generate phone number
  const phone = faker.phone.number();

  // Generate address (global) - ensure all components are from the same country
  const streetAddress = faker.location.streetAddress();
  const city = faker.location.city();
  const state = faker.location.state();
  const country = faker.location.country();
  const postalCode = faker.location.zipCode();
  const address = `${streetAddress}, ${city}, ${state}, ${country} ${postalCode}`;

  // Generate age and calculate consistent birthday
  const age = faker.number.int({ min: 18, max: 65 });
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const birthday = faker.date.between({
    from: new Date(birthYear, 0, 1),
    to: new Date(birthYear, 11, 31)
  }).toISOString().split('T')[0];

  // Generate gender-appropriate profile photo
  let profilePhoto;
  if (gender === 'male') {
    profilePhoto = `https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 99 })}.jpg`;
  } else {
    profilePhoto = `https://randomuser.me/api/portraits/women/${faker.number.int({ min: 1, max: 99 })}.jpg`;
  }

  // Generate additional user data
  const user = {
    id: faker.string.uuid(),
    name: {
      first: firstName,
      last: lastName,
      full: fullName
    },
    email: email,
    phone: phone,
    address: {
      street: streetAddress,
      city: city,
      state: state,
      country: country,
      postalCode: postalCode,
      full: address
    },
    profile: {
      photo: profilePhoto,
      age: age,
      gender: gender,
      birthday: birthday
    },
    employment: {
      company: faker.company.name(),
      jobTitle: faker.person.jobTitle(),
      department: faker.commerce.department()
    },
    location: {
      coordinates: {
        latitude: parseFloat(faker.location.latitude()),
        longitude: parseFloat(faker.location.longitude())
      }
    },
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    updatedAt: faker.date.recent().toISOString()
  };

  return user;
}

// Generate multiple fake users
function generateUsers(count = 10) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateUser());
  }
  return users;
}

// Generate user with specific gender
function generateUserByGender(gender) {
  const user = generateUser();
  user.profile.gender = gender;
  
  // Adjust photo service based on gender
  if (gender === 'male') {
    user.profile.photo = `https://randomuser.me/api/portraits/men/${faker.number.int({ min: 1, max: 99 })}.jpg`;
  } else {
    user.profile.photo = `https://randomuser.me/api/portraits/women/${faker.number.int({ min: 1, max: 99 })}.jpg`;
  }
  
  return user;
}

// Generate users by age range
function generateUsersByAgeRange(minAge, maxAge, count = 10) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = generateUser();
    const age = faker.number.int({ min: minAge, max: maxAge });
    user.profile.age = age;
    
    // Calculate birthday based on age
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;
    user.profile.birthday = faker.date.between({
      from: new Date(birthYear, 0, 1),
      to: new Date(birthYear, 11, 31)
    }).toISOString().split('T')[0];
    
    users.push(user);
  }
  return users;
}

module.exports = {
  generateUser,
  generateUsers,
  generateUserByGender,
  generateUsersByAgeRange
};
