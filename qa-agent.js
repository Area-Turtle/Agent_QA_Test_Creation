import { execSync } from "node:child_process";

function run(command) {
    console.log(`\n> ${command}\n`);

    try {
        execSync(command, {
            stdio: "inherit",
            shell: true
        });

        return true;
    } catch {
        return false;
    }
}

function main() {
    console.log("Starting QA test suite...\n");

    const apiPassed = run("npm run api:test");
    const e2ePassed = run("npm run e2e:test");

    console.log("\n========== QA SUMMARY ==========");

    console.log(
        `API Tests: ${apiPassed ? "PASSED" : "FAILED"}`
    );

    console.log(
        `E2E Tests: ${e2ePassed ? "PASSED" : "FAILED"}`
    );

    if (!apiPassed || !e2ePassed) {
        process.exitCode = 1;
    }
}

main();