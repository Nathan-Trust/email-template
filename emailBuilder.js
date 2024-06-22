const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

// Function to compile EJS template
function compileTemplate(templateName, data) {
  const templatePath = path.resolve(__dirname, `${templateName}.ejs`);
  const templateContent = fs.readFileSync(templatePath, "utf8");
  return ejs.render(templateContent, data);
}

// Example usage
const headerContent = compileTemplate("header", {
  /* pass any necessary data */
});
const footerContent = compileTemplate("footer", {
  /* pass any necessary data */
});

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
                      <!-- header ends here  -->
                      <br />
                      <span style="font-weight: 600; font-size: 17px; font-family: 'Poppins' , sans-serif;" 
                        >Hello Chris,</span
                      >
                      <br /> <br>
                      <span
                        style="
                        margin-top: 120px;
                          font-size: 12.2px;
                          line-height: 20px;
                           font-family: 'Poppins' , sans-serif;
                        "
                      >
                        Thank you for submiting your KYC documents for upgrade.
                        Unfortunately your upgrade request has been declined
                        because we were unable to verify your document. Please
                        ensure that there is not mismatch while providing your
                        document
                      </span>

                      <br />
                      <br />
                      <span
                        style="
                          font-size: 12px;
                          line-height: 20px;
                          font-family: 'Poppins' , sans-serif;
                        "
                      >
                        Contact our support channel at
                        <span style="color: #3849e3;cursor: pointer; text-decoration: underline"
                          >support@boundlesspay.com</span
                        >
                        or call our customer careline at +234 584 213 1209 ,
                        +234 584 213 1209
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        padding: 40px;
                        text-align: center;
                        /* font-size: 24px; */
                        width: 100%;
                        padding: 1px;
                        /* padding: 10px; */
                      "
                      class="padding"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        style="
                          margin: auto;
                          width: 100%;
                          padding: 10px 0px 10px 0px;
                          text-align: start;
                          border-radius: 10px;
                          color: #000;
                        "
                      >
                        <tr>
                          <td
                            style="
                              border-bottom: 1px dashed #99999e;
                              height: 6px;
                            "
                          ></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="font-size: 10px; font-weight: 450; color: #909096"
                      class="padding"
                    >
                      <span style="line-height: 20px">
                        You are recieving this message because you signed up on
                        Boundless pay. For more information about how we process
                        data , please see our privacy policy
                      </span>
                      <br />
                      <br /><br />
                      Copyright&copy;Boundlesspay.2024 All right reserved.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
   ${footerContent} 
            <!-- footer ends here -->
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

console.log(emailContent); // Output or send the emailContent as needed
