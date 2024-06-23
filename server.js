const express = require("express");
const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Set EJS as view engine
app.set("view engine", "ejs");

// Serve static files from public directory (optional)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/email", async (req, res) => {
  try {
    // Render header.ejs
    const headerContent = await ejs.renderFile(
      path.join(__dirname, "header.ejs"),
      {
        /* data object if needed */
      }
    );

    // Render footer.ejs
    const footerContent = await ejs.renderFile(
      path.join(__dirname, "footer.ejs"),
      {
        /* data object if needed */
      }
    );

      const mainContent = await ejs.renderFile(
        path.join(__dirname, "content.ejs"),
        {
          /* data object if needed */
        }
      );

        const copyrightContent = await ejs.renderFile(
        path.join(__dirname, "copyright.ejs"),
        {
          /* data object if needed */
        }
      );
    // Combine header, footer, and email content into a complete HTML email template
    const emailContent = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email-Template</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <style>
      @media screen and (max-width: 600px) {
        .content {
          width: 100% !important;
          display: block !important;
          /* padding: 10px !important; */
        }
        .header,
        .body,
        .footer {
          padding: 10px !important;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        .rightTd {
          display: none;
        }
        .inner-table {
          padding: 10px;
        }
        .padding {
          padding: 10px !important;
        }
      }
    </style>
  </head>
  <body style="font-family: 'Inter', sans-serif">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table
            class="content"
            width="700"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="
              border-collapse: collapse;
              border-radius: 4px;
              background-color: #f3f6ff;
            "
          >
            <tr>
              <td
                class="header"
                style="
                  /* padding: 40px; */
                  text-align: center;
                  padding: 60px 70px 0px 70px;
                "
              >
                <!-- CTA Button -->
                <table
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    /* margin: auto; */
                    background-color: #fff;
                    width: 100%;
                    height: 60px;
                    padding: 20px !important;
                    text-align: start;
                    border-radius: 10px;
                    border: 1px solid #ebebf0;
                    color: #000;
                  "
                  class="inner-table"
                >
                  <tr>
                    <td style="width: 100%" class="padding">
                      <!-- header starts here -->
                      ${headerContent}
                      <!-- header ends here -->
                      <!-- content starts here -->
                      ${mainContent}
                      <!-- content ends here -->
                      <!-- copyright starts here -->
                      ${copyrightContent}
                      <!-- copyright ends here -->
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- footer -->
            ${footerContent}
            <!-- footer -->
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;

    // Send email using Nodemailer to multiple recipients
    await sendEmail(emailContent, [
      "nathantrustekanem@gmail.com",
      "abasifreke1000@gmail.com",
    ]);

    res.send("Email sent successfully."); // Send response to the client
  } catch (err) {
    console.error("Error rendering template:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Function to send email using Nodemailer
async function sendEmail(emailContent, recipients) {
  // Use the provided Ethereal credentials
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "meda.lesch14@ethereal.email", // your Ethereal username
      pass: "7FBJ4XDgkEYXrGh1w4", // your Ethereal password
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Boundless Pay" <boundlesspay@example.com>', // sender address
    to: recipients.join(", "), // list of receivers as a comma-separated string
    subject: "Your KYC Upgrade Request", // Subject line
    html: emailContent, // HTML email template
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
