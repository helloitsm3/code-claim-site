import { Box, Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

import { ClaimCardState } from "./ClaimCard";

const Avatar = ({
  imageUrl,
  showPlaceholder,
}: {
  imageUrl: string | null | undefined;
  showPlaceholder: boolean;
}) => {
  const shouldShowPlaceholder =
    showPlaceholder ||
    imageUrl === null ||
    imageUrl === undefined ||
    imageUrl.length === 0;
  return shouldShowPlaceholder ? (
    <Box
      background="gray.200"
      w={["96px", "120px"]}
      h={["96px", "120px"]}
      borderRadius="16px"
    />
  ) : (
    <Image
      src={imageUrl}
      alt="avatar"
      w={["96px", "120px"]}
      h={["96px", "120px"]}
      borderRadius="16px"
    />
  );
};

const ButtonPlaceholder = () => (
  <Box background="gray.200" borderRadius="12px" w="100%" h="56px" mt="24px" />
);

const ClaimButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <Button
    background="#08010D"
    borderRadius="12px"
    color="#FFF"
    fontSize={["16px", "18px"]}
    fontWeight="900"
    w="100%"
    h="56px"
    _active={{}}
    _hover={{
      transform:
        "translate3d(0px, -2px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
      transformStyle: "preserve-3d",
    }}
    onClick={onClick}
  >
    <Text>
      CLAIM{" "}
      <span style={{ fontFamily: "IBM Plex Mono", fontWeight: 600 }}>
        {label}
      </span>{" "}
      TOKENS
    </Text>
  </Button>
);

interface HeaderData {
  address: string;
  image: string;
  showLabel: boolean;
  showPlaceholder: boolean;
}

export const Header = ({
  data: { address, image, showLabel, showPlaceholder },
}: {
  data: HeaderData;
}) => (
  <Flex align="center">
    <Avatar imageUrl={image} showPlaceholder={showPlaceholder} />
    <Flex direction="column" ml={["20px", "32px"]}>
      {showLabel && (
        <Flex align="center">
          <Image
            src="assets/eligible-check.svg"
            alt="check"
            w="20px"
            h="20px"
            mr="8px"
          />
          <Text color="#4E4853" fontSize={["16px", "18px"]} fontWeight="500">
            Eligible wallet
          </Text>
        </Flex>
      )}
      <Text
        color="#08010D"
        fontSize={["32px", "42px"]}
        fontWeight="500"
        mt="-8px"
      >
        {address}
      </Text>
    </Flex>
  </Flex>
);

const Position = ({
  title,
  value,
  isBig = false,
}: {
  title: string;
  value: string;
  isBig: boolean;
}) => (
  <Flex direction="column">
    <Flex direction="row" align="baseline" px="24px">
      <Text
        color={isBig ? "#08010D" : "#4E4853"}
        fontSize={isBig ? "24px" : "18px"}
        fontWeight="500"
      >
        {title}
      </Text>
      <Spacer />
      <Text
        color={isBig ? "#08010D" : "#4E4853"}
        fontFamily="IBM Plex Mono"
        fontSize={isBig ? "32px" : "24px"}
        fontWeight="400"
      >
        {value}
      </Text>
    </Flex>
  </Flex>
);

interface ClaimedViewProps {
  blockConfirmations: number;
  claimDate: string;
  totalAllocation: string;
  onAddCodeToMetaMask: () => void;
  onViewTransaction: () => void;
}

export const ClaimedView = (props: ClaimedViewProps) => {
  const {
    blockConfirmations,
    claimDate,
    onAddCodeToMetaMask,
    onViewTransaction,
    totalAllocation,
  } = props;
  return (
    <>
      <Flex direction="column" mb="8">
        <Box border="1px solid #08010D" opacity="8%" my="4" />
        <Box>
          <Position
            title="$CODE allocation"
            value={totalAllocation}
            isBig={true}
          />
          <Box mt="16px">
            <Text
              px="24px"
              fontFamily="Zen Kaku Gothic New"
              color="#4E4853"
              fontSize="18px"
              fontWeight="500"
            >
              Claimed on {claimDate}
            </Text>

            <Flex mx="24px" mt="8px">
              <Image
                src="assets/block-confirmations.svg"
                alt="confirmations"
                w="24px"
                h="24px"
                alignSelf="center"
              />
              <Text
                fontFamily="IBM Plex Mono"
                bgGradient="linear(to-r, #AD00FF, #4E00EC)"
                bgClip="text"
                fontSize="18px"
                fontWeight="500"
                pl="8px"
              >
                {blockConfirmations} block confirmations
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Box px="24px" pb="24px">
        <Box>
          <Button
            background="#08010D"
            borderRadius="12px"
            color="#FFF"
            fontSize={["16px", "18px"]}
            fontWeight="900"
            w="100%"
            h="56px"
            mb="8px"
            _active={{}}
            _hover={{
              transform:
                "translate3d(0px, -2px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              transformStyle: "preserve-3d",
            }}
            onClick={onViewTransaction}
          >
            <Text>VIEW CLAIM TRANSACTION</Text>
          </Button>

          <Button
            borderRadius="12px"
            borderColor="#08010D"
            borderWidth="2px"
            color="#08010D"
            fontSize={["16px", "18px"]}
            fontWeight="900"
            w="100%"
            h="56px"
            _active={{}}
            _hover={{
              transform:
                "translate3d(0px, -2px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              transformStyle: "preserve-3d",
            }}
            onClick={onAddCodeToMetaMask}
          >
            <Text>ADD $CODE TO METAMASK</Text>
          </Button>
        </Box>
      </Box>
    </>
  );
};

interface UnclaimedViewProps {
  cardState: ClaimCardState;
  positions: { title: string; value: number }[];
  totalAllocation: string;
  onClickClaim: () => void;
}

export const UnclaimedView = ({
  cardState,
  positions,
  totalAllocation,
  onClickClaim,
}: UnclaimedViewProps) => {
  return (
    <>
      <Flex direction="column" mb="8">
        <Box border="1px solid #08010D" opacity="8%" />
        {positions.map((pos, index) => {
          return (
            <Box key={index} my="2">
              <Position
                title={pos.title}
                value={pos.value.toString()}
                isBig={false}
              />
            </Box>
          );
        })}
        <Box border="1px solid #08010D" opacity="8%" my="4" />
        <Box>
          <Position
            title="$CODE allocation"
            value={totalAllocation}
            isBig={true}
          />
        </Box>
      </Flex>
      <Box px="24px" pb="24px">
        {cardState === ClaimCardState.disconnected ? (
          <ButtonPlaceholder />
        ) : (
          <ClaimButton label={totalAllocation} onClick={onClickClaim} />
        )}
      </Box>
    </>
  );
};
