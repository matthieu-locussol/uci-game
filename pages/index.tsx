import type { GetServerSideProps } from "next";
import type { OsIconType } from "../components/OsIcon";
import type { Version } from "./api/version";

import { PlayCircleRounded } from "@mui/icons-material";
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
    width: 2784,
    height: 1824,
  },
  {
    src: "/screenshots/1.png",
    alt: "Screenshot 2",
    width: 2784,
    height: 1824,
  },
  {
    src: "/screenshots/2.png",
    alt: "Screenshot 3",
    width: 2784,
    height: 1824,
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
            <CustomButton
              fullWidth
              color="inherit"
              disabled={atLeastOneIsUpdating}
              href="https://unforeseen-conspiracy-inc.vercel.app/"
              rel="noreferrer"
              size="large"
              startIcon={
                <PlayCircleRounded
                  color="primary"
                  sx={{ fontSize: 20, mr: 1 }}
                />
              }
              sx={{
                textDecoration: "none",
                width: "100%",
                gridColumn: { md: "span 2", sm: "span 1" },
              }}
              target="_blank"
              variant="contained"
            >
              <Typography
                fontStyle={atLeastOneIsUpdating ? "italic" : "normal"}
              >
                Play in the browser
              </Typography>
            </CustomButton>
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
            <Box display="grid" gridTemplateColumns="1fr">
              {screens.map(({ src, alt, width, height }) => (
                <Image
                  key={src}
                  alt={alt}
                  height={SCREENSHOT_WIDTH * (height / width)}
                  src={src}
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
