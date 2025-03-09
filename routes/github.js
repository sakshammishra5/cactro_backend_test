const router = require('express').Router();


router.get('/github', async (req, res) => {
    console.log("Fetching user data");
    try {
        let response = await fetch('https://api.github.com/users/sakshammishra5')
        let data = await response.json();

        let repoResponse = await fetch('https://api.github.com/users/sakshammishra5/repos')
        let repoData = await repoResponse.json();

        data.repoData = repoData;
        res.send(data);
    }
    catch (error) {
        res.send(error);
    }

});

router.get('/github/:repoName', async (req, res) => {
    console.log("request received");
    const { repoName } = req.params;
    try {
        const response = await fetch(`https://api.github.com/repos/sakshammishra5/${repoName}`);
        const data = await response.json();
        res.send(data);
    }
    catch (error) {
        res.send(error);
    }
});


router.get("/github/:repoName/issues", (req, res) => {
    const { repoName } = req.params;
    res.render("issueform", { repoName });
})

router.post("/github/issues", async (req, res) => {
    console.log("Request body:", req.body);
    const { title, description, repoName } = req.body;

    // Validate the request body
    if (!title || !repoName) {
        return res.status(400).json({ error: "Title and repoName are required" });
    }

    try {
        const response = await fetch(
            `https://api.github.com/repos/sakshammishra5/${repoName}/issues`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json', // Ensure GitHub API v3 response
                },
                body: JSON.stringify({
                    title,
                    body: description || "", // Body is optional, default to empty string if not provided
                }),
            }
        );

        // Check if the response is successful before parsing
        if (!response.ok) {
            const errorData = await response.json();
            console.error("GitHub API error:", errorData);
            throw new Error(`Failed to create issue: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("GitHub API response:", data);

        // Return the issue URL
        res.status(201).json({ issue_url: data.html_url,data });
    } catch (error) {
        console.error("Error creating issue:", error.message);
        res.status(500).json({ error: `Failed to create issue: ${error.message}` });
    }
});

module.exports = router;