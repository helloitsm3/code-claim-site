import { Flex, Image, Link, Text, useBreakpointValue } from "@chakra-ui/react";

interface SocialLinkProps {
  icon: string;
  iconAlt: string;
  title: string;
  isMobile: boolean;
}

const SocialLink = ({ icon, iconAlt, title, isMobile }: SocialLinkProps) =>
  isMobile ? (
    <Image src={icon} alt={iconAlt} w="16px" h="16px" />
  ) : (
    <Text fontSize="18px" fontWeight="500" color="#08010D">
      {title}
    </Text>
  );

export const SocialLinks = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? false;

  return (
    <Flex align="center">
      <Link href="https://github.com/Developer-DAO/code-claim-site" isExternal>
        <SocialLink
          icon="assets/github-icon.png"
          iconAlt="Contract link"
          title="Contract"
          isMobile={isMobile}
        />
      </Link>
      <Link href="https://discord.gg/devdao" isExternal ml={["32px", "60px"]}>
        <SocialLink
          icon="assets/discord-icon.svg"
          iconAlt="Discord"
          title="Discord"
          isMobile={isMobile}
        />
      </Link>
      <Link
        href="https://twitter.com/developer_dao"
        isExternal
        ml={["32px", "60px"]}
      >
        <SocialLink
          icon="assets/twitter-icon.svg"
          iconAlt="Twitter"
          title="Twitter"
          isMobile={isMobile}
        />
      </Link>
    </Flex>
  );
};
