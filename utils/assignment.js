/**
 * HANDS-ON LAB: Translating Logic into Code
 * Topic: Data-Driven Testing
 */

// 1. The Dataset: An array of user objects.

const userDatasets = [
    { id: "USR01", username: "admin", password: "pass123", isLocked: false, correctPassword: "pass123" },
    { id: "USR02", username: "testUser", password: "wrongPass", isLocked: false, correctPassword: "pass123" },
    { id: "USR03", username: "lockedUser", password: "pass123", isLocked: true, correctPassword: "pass123" },
    { id: "USR04", username: "guest", password: "guest123", isLocked: false, correctPassword: "guest123" },
    { id: "USR05", username: "emptyUser", password: "", isLocked: false, correctPassword: "anyPassword" }
];

// 2. The Validation Function.

function validateLogin(user) {
    // Condition 1: Check if password is missing (empty string)
    if (user.password === "") {
        return "Failure (Missing Pass)";
    }

    // Condition 2: Check if the account is locked
    if (user.isLocked) {
        return "Failure (Account Locked)";
    }

    // Condition 3: Check if the password provided matches the correct one
    if (user.password !== user.correctPassword) {
        return "Failure (Invalid Pass)";
    }

    // If all checks pass
    return "Success";
}

// 3. Looping through the array of objects and using Template Literals to log the result.

console.log("--- Starting Login Validation Test ---");

/*

// Using a standard for loop to iterate through the user datasets

for (let i = 0; i < userDatasets.length; i++) {
    
    const user = userDatasets[i];
    
    const outcome = validateLogin(user);
    
    console.log(`User ID: ${user.id} | Username: ${user.username} | Outcome: ${outcome}`);
}
*/


userDatasets.forEach((user) => {
    const outcome = validateLogin(user);
    console.log(`User ID: ${user.id} | Username: ${user.username} | Outcome: ${outcome}`);
});

console.log("--- Test Complete ---");