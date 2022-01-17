export const validateInputApplyJob = ({
  firstName,
  lastName,
  email,
  resume,
}) => {
  let errors = {};

  if (firstName.trim() === "") {
    errors.firstName = "First name should not be empty";
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last name should not be empty";
  }
  // email
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be valid email addressed";
    }
  }

  if (resume.name) {
    if (resume.name.trim() === "") {
      errors.resume = "Resume or CV should not be empty";
    }
  } else {
    if (resume.trim() === "") {
      errors.resume = "Resume or CV should not be empty";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateWaitingList = ({ firstName, lastName, email }) => {
  let errors = {};

  if (firstName.trim() === "") {
    errors.firstName = "First name should not be empty";
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last name should not be empty";
  }
  // email
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be valid email addressed";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
