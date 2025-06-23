import type { GetServerSideProps } from "next";
import type { OsIconType } from "../components/OsIcon";
import type { Version } from "./api/version";

import DownloadsIcon from "@mui/icons-material/CloudDownloadRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useState } from "react";

import { ConditionalWrapper } from "../components/ConditionalWrapper";
import { CustomButton } from "../components/CustomButton";
import { StyledTab, StyledTabs } from "../components/CustomTabs";
import { OsIcons } from "../components/OsIcon";

const screens = [
  {
    src: "/screenshots/0.png",
    alt: "Screenshot 1",
    width: 2488,
    height: 1598,
  },
  {
    src: "/screenshots/1.png",
    alt: "Screenshot 2",
    width: 2038,
    height: 1576,
  },
  {
    src: "/screenshots/2.png",
    alt: "Screenshot 3",
    width: 2042,
    height: 1578,
  },
  {
    src: "/screenshots/3.png",
    alt: "Screenshot 4",
    width: 2042,
    height: 1578,
  },
  {
    src: "/screenshots/4.png",
    alt: "Screenshot 5",
    width: 2444,
    height: 1558,
  },
  {
    src: "/screenshots/5.png",
    alt: "Screenshot 6",
    width: 2438,
    height: 1554,
  },
  {
    src: "/screenshots/6.png",
    alt: "Screenshot 7",
    width: 2084,
    height: 1606,
  },
  {
    src: "/screenshots/7.png",
    alt: "Screenshot 8",
    width: 2080,
    height: 1598,
  },
  {
    src: "/screenshots/8.png",
    alt: "Screenshot 9",
    width: 2082,
    height: 1610,
  },
  {
    src: "/screenshots/9.png",
    alt: "Screenshot 10",
    width: 2078,
    height: 1604,
  },
];

const SCREENSHOT_WIDTH = 800;

interface IndexPageProps {
  date: string;
  version: string;
  platforms: {
    name: OsIconType;
    url: string;
    availableText: string;
    updatingText: string;
    updating: boolean;
    extension: string;
  }[];
}

const IndexPage = ({ version, date, platforms }: IndexPageProps) => {
  const [value, setValue] = useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const atLeastOneIsUpdating = platforms.some((platform) => platform.updating);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: "rgb(17,94,89)",
          backgroundImage:
            "radial-gradient(circle, rgba(17,94,89,1) 0%, rgba(17,24,39,1) 100%)",
          borderBottom: "1px solid lightgray",
          p: 8,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box display="flex">
            <Typography
              color="white"
              fontWeight="bold"
              sx={{ mb: 2 }}
              variant="h3"
            >
              Unforeseen Conspiracy Inc.
            </Typography>
            <Typography
              color="white"
              sx={{ mb: 2, ml: 2, mt: "auto" }}
              variant="overline"
            >
              {version}
            </Typography>
          </Box>
          <Typography color="white" sx={{ opacity: 0.7 }} variant="h6">
            Pigeons are watching you.
          </Typography>
          <Typography
            color="white"
            fontStyle="italic"
            sx={{ opacity: 0.7, mb: 4 }}
            variant="subtitle1"
          >
            Last release: {new Date(date).toUTCString()}
          </Typography>
          <Box
            display="grid"
            gap={4}
            gridTemplateColumns={{ md: "1fr 1fr", sm: "1fr" }}
            justifyItems="center"
          >
            {platforms.map(
              ({
                name,
                url,
                updating,
                availableText,
                updatingText,
                extension,
              }) => (
                <ConditionalWrapper
                  key={extension}
                  condition={!updating}
                  wrapper={(children) => (
                    <Link href={url} sx={{ textDecoration: "none" }}>
                      {children}
                    </Link>
                  )}
                >
                  <CustomButton
                    color="secondary"
                    disabled={updating}
                    size="large"
                    startIcon={OsIcons[name]}
                    sx={{ minWidth: 350 }}
                    variant="contained"
                  >
                    <Typography fontStyle={updating ? "italic" : "normal"}>
                      {updating
                        ? updatingText
                        : `${availableText} (${extension})`}
                    </Typography>
                  </CustomButton>
                </ConditionalWrapper>
              )
            )}
            <ConditionalWrapper
              condition={!atLeastOneIsUpdating}
              wrapper={(children) => (
                <Link
                  href="https://github.com/matthieu-locussol/unforeseen-conspiracy-inc/releases/latest"
                  rel="noreferrer"
                  sx={{
                    textDecoration: "none",
                    width: "100%",
                    gridColumn: { md: "span 2", sm: "span 1" },
                  }}
                  target="_blank"
                >
                  {children}
                </Link>
              )}
            >
              <CustomButton
                fullWidth
                color="inherit"
                disabled={atLeastOneIsUpdating}
                size="large"
                startIcon={<DownloadsIcon sx={{ fontSize: 20, mr: 1 }} />}
                sx={{
                  textDecoration: "none",
                  width: "100%",
                  gridColumn: { md: "span 2", sm: "span 1" },
                }}
                variant="contained"
              >
                <Typography
                  fontStyle={atLeastOneIsUpdating ? "italic" : "normal"}
                >
                  Other downloads
                </Typography>
              </CustomButton>
            </ConditionalWrapper>
          </Box>
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns="1fr"
            justifyItems="center"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <Link
              href="https://github.com/matthieu-locussol/unforeseen-conspiracy-inc"
              rel="noopener noreferrer"
              target="_blank"
            >
              <CustomButton
                sx={{
                  p: 1,
                  minWidth: 0,
                  borderRadius: 9999,
                  borderColor: "#181717",
                  backgroundColor: "#181717",
                  "&:hover": {
                    backgroundColor: "#181717AA",
                  },
                }}
                variant="contained"
              >
                <GitHubIcon />
              </CustomButton>
            </Link>
          </Box>
        </Container>
      </Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <StyledTabs
            aria-label="styled tabs example"
            value={value}
            onChange={handleChange}
          >
            <StyledTab label="About" value={1} />
            <StyledTab label="Screenshots" value={2} />
          </StyledTabs>
        </Box>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            mb: 6,
          }}
        >
          {value === 1 && (
            <Typography sx={{ mb: 2, width: "100%" }} textAlign="justify">
              Unravel conspiracies both mundane and monstrous, from government
              cover-ups to why pigeons seem so... shifty. Click onward, the
              rabbit hole awaits!
            </Typography>
          )}
          {value === 2 && (
            <Box display="grid" gap={4} gridTemplateColumns="1fr">
              {screens.map(({ src, alt, width, height }) => (
                <Image
                  key={src}
                  alt={alt}
                  height={SCREENSHOT_WIDTH * (height / width)}
                  src={src}
                  style={{
                    border: "2px solid #111827",
                    borderRadius: 8,
                  }}
                  width={SCREENSHOT_WIDTH}
                />
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default IndexPage;

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/version`);
  const version: Version = await data.json();

  return {
    props: {
      date: version?.pub_date || "",
      version: version?.version || "",
      platforms: [
        {
          name: "Linux",
          url:
            version?.platforms?.["linux-x86_64"]?.url.replace(".tar.gz", "") ||
            "",
          availableText: "Download for Linux",
          updatingText: "Updating for Linux...",
          updating:
            typeof version?.platforms?.["linux-x86_64"]?.url !== "string",
          extension: ".AppImage",
        },
        {
          name: "MacOS",
          url:
            version?.platforms?.["windows-x86_64"]?.url.replace(
              "_x64_en-US.msi.zip",
              "_aarch64.dmg"
            ) || "",
          availableText: "Download for Mac OS - M1",
          updatingText: "Updating for Mac OS - M1...",
          updating:
            typeof version?.platforms?.["darwin-aarch64"]?.url !== "string",
          extension: ".app",
        },
        {
          name: "MacOS",
          url:
            version?.platforms?.["windows-x86_64"]?.url.replace(
              "_en-US.msi.zip",
              ".dmg"
            ) || "",
          availableText: "Download for Mac OS - Intel",
          updatingText: "Updating for Mac OS - Intel...",
          updating:
            typeof version?.platforms?.["darwin-x86_64"]?.url !== "string",
          extension: ".app",
        },
        {
          name: "Windows",
          url:
            version?.platforms?.["windows-x86_64"]?.url.replace(".zip", "") ||
            "",
          availableText: "Download for Windows",
          updatingText: "Updating for Windows...",
          updating:
            typeof version?.platforms?.["windows-x86_64"]?.url !== "string",
          extension: ".msi",
        },
      ],
    },
  };
};
