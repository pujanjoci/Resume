<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
        <head>
            <title>XML Sitemap - Pujan Joshi</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&amp;display=swap" rel="stylesheet"/>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(to right, #6a11cb, #2575fc);
                    color: #fff;
                    text-align: center;
                    margin: 0;
                    padding: 20px;
                }
                h2 {
                    font-weight: 600;
                    margin-bottom: 10px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                }
                p {
                    font-size: 14px;
                    opacity: 0.8;
                }
                table {
                    width: 80%;
                    margin: 20px auto;
                    border-collapse: collapse;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    overflow: hidden;
                    background: #fff;
                    color: #333;
                }
                th, td {
                    padding: 12px 15px;
                    border-bottom: 1px solid #ddd;
                    text-align: left;
                }
                th {
                    background: #6a11cb;
                    color: #fff;
                    text-transform: uppercase;
                }
                tr:hover {
                    background: #f5f5f5;
                }
                td a {
                    color: #6a11cb;
                    text-decoration: none;
                    font-weight: 600;
                }
                td a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <h2>📜 XML Sitemap</h2>
            <p>This is an automatically generated sitemap for <strong>pujan-joshi.com.np</strong>. It helps search engines crawl your site effectively.</p>
            
            <table>
                <tr>
                    <th>URL</th>
                    <th>Last Modified</th>
                    <th>Priority</th>
                </tr>
                <xsl:for-each select="urlset/url">
                    <tr>
                        <td><a href="{loc}" target="_blank"><xsl:value-of select="loc"/></a></td>
                        <td><xsl:value-of select="lastmod"/></td>
                        <td><xsl:value-of select="priority"/></td>
                    </tr>
                </xsl:for-each>
            </table>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
