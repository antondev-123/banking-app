import { Button, Stack } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      <Link href="/deposit">
        <Button variant="contained" fullWidth>
          Deposit Money
        </Button>
      </Link>
      <Link href="/withdraw">
        <Button variant="contained" fullWidth>
          Withdraw Money
        </Button>
      </Link>
      <Link href="/transfer">
        <Button variant="contained" fullWidth>
          Transfer Money
        </Button>
      </Link>
      <Link href="/statement">
        <Button variant="contained" fullWidth>
          View Account Statement
        </Button>
      </Link>
    </Stack>
  );
}
