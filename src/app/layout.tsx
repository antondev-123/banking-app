import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import Link from "next/link";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Banking App
            </Typography>
            <Link href="/" passHref>
              <Button
                variant="text"
                sx={{
                  color: "white",
                  backgroundColor: "initial",
                  "&:hover": {
                    backgroundColor: "#005BBB"
                  }
                }}
              >
                Home
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
