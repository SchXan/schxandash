import { ChevronLeftIcon, ChevronRightIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Circle,
  Flex,
  Grid,
  Heading,
  HStack,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/layout';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Hide,
  Icon,
  IconButton,
  Image,
  Progress,
  Show,
} from '@chakra-ui/react';
import { config } from 'config/common';
import { BsMusicNoteBeamed, BsPlay, BsPlayBtn, BsShareFill } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import { MdVoiceChat } from 'react-icons/md';
import { useColors, useColorsExtend, useItemHoverBg } from 'theme';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { IoPricetag } from 'react-icons/io5';
import { StyledChart } from 'components/chart/StyledChart';
import { dashboard } from 'config/translations/dashboard';

export function ExampleDashboardView() {
  const t = dashboard.useTranslations();
  const { globalBg } = useColors();

  return (
    <Flex direction="column" gap={5}>
      <HStack rounded="2xl" bg="brand.300" gap={2} p={5}>
        <Circle color="white" bg="blackAlpha.300" p={4} display={{ base: 'none', md: 'block' }}>
          <Icon as={FaRobot} w="60px" h="60px" />
        </Circle>

        <Flex direction="column" align="start" gap={1}>
          <Text color="white" fontSize="2xl" fontWeight="bold">
            {t.invite.title}
          </Text>
          <Text color="whiteAlpha.800">{t.invite.description}</Text>
          <Button mt={3} as={Link} href={config.inviteUrl}>
            {t.invite.bn}
          </Button>
        </Flex>
      </HStack>
      <Flex direction="column" gap={2} mt={3}>
        <Heading size="md">{t.music.title}</Heading>
        <Text variant="secondary">{t.music.description}</Text>
        <MusicPlayer />
      </Flex>
      <Grid templateColumns={{ base: '1fr', lg: '0.5fr 1fr' }} gap={3}>
        <Card rounded="3xl">
          <CardBody as={Center} p={4} flexDirection="column" gap={3}>
            <Circle p={4} bg={globalBg}>
              <Icon as={BsMusicNoteBeamed} w="80px" h="80px" />
            </Circle>
            <Text fontWeight="600">{t.vc.create}</Text>
          </CardBody>
        </Card>
        <Flex direction="column" gap={3}>
          <Text fontSize="xl" fontWeight="600">
            {t.vc['created channels']}
          </Text>
          <VoiceChannelItem />
          <VoiceChannelItem />
          <VoiceChannelItem />
        </Flex>
      </Grid>
      <Flex direction="column" p={3}>
        <Box w="fit-content">
          <Heading size="lg">{t.command.title}</Heading>
          <Text variant="secondary">{t.command.description}</Text>
          <Button mt={2} leftIcon={<IoPricetag />}>
            {t.pricing}
          </Button>
        </Box>
        <TestChart />
      </Flex>
    </Flex>
  );
}

function TestChart() {
  const responsive: ApexResponsive = {
    breakpoint: 500,
    options: {
      chart: {
        width: '100%',
        height: 'auto',
      },
    },
  };

  return (
    <Grid templateColumns={{ base: '1fr', lg: '1fr 0.5fr' }}>
      <StyledChart
        options={{
          colors: ['#4318FF', '#39B8FF'],
          xaxis: {
            categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
          },
          responsive: [responsive],
        }}
        series={[
          {
            name: 'Paid',
            data: [50, 64, 48, 66, 49, 68],
          },
          {
            name: 'Free Usage',
            data: [30, 40, 24, 46, 20, 46],
          },
        ]}
        height="300"
        type="line"
      />
      <StyledChart
        options={{
          colors: ['#4318FF', '#39B8FF'],
          labels: ['Paid', 'Free Usage'],
          responsive: [responsive],
        }}
        series={[30, 1000]}
        type="pie"
        width="400"
      />
    </Grid>
  );
}

function MusicPlayer() {
  const t = dashboard.useTranslations();
  const { cardBg, textColorSecondary, brand } = useColors();

  return (
    <>
      <Flex direction="row" gap={5}>
        <Hide below="md">
          <Image
            rounded="xl"
            src="https://cdns-images.dzcdn.net/images/artist/61bcbf8296b1669499064406c534d39d/500x500.jpg"
            bg={brand}
            w="200px"
            h="200px"
          />
        </Hide>

        <Flex direction="column" bg={cardBg} rounded="xl" gap={3} p={3} flex={1}>
          <HStack color={textColorSecondary} display={{ base: 'none', md: 'flex' }}>
            <BsPlayBtn />
            <Text>{t.music['now playing']}</Text>
          </HStack>
          <HStack>
            <Avatar name="Stay with me" size="sm" />
            <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="bold">
              ZUTOMAYO - Study Me
            </Text>
          </HStack>

          <HStack mt="auto" justify="space-between" fontWeight="bold">
            <IconButton
              fontSize="4xl"
              icon={<ChevronLeftIcon />}
              aria-label="previous"
              variant="action"
            />
            <IconButton
              p={1}
              h="fit-content"
              fontSize="4xl"
              icon={<BsPlay />}
              aria-label="pause"
              variant="brand"
              rounded="full"
            />
            <IconButton
              fontSize="4xl"
              icon={<ChevronRightIcon />}
              aria-label="next"
              variant="action"
            />
          </HStack>
          <HStack px={3}>
            <Text>1:28</Text>
            <Progress w="full" value={50} />
          </HStack>
        </Flex>
      </Flex>
      <HStack mt={2}>
        <Button leftIcon={<AiFillLike />} variant="action">
          1203
        </Button>
        <Button leftIcon={<AiFillDislike />} variant="action">
          297
        </Button>
        <Button leftIcon={<BsShareFill />} variant="action">
          103
        </Button>
        <Hide below="2sm">
          <Spacer />
          <Button leftIcon={<ViewIcon />} variant="action">
            4258
          </Button>
        </Hide>
      </HStack>
    </>
  );
}

function VoiceChannelItem() {
  const hover = useItemHoverBg();
  const { iconBg } = useColorsExtend(
    {
      iconBg: 'blackAlpha.100',
    },
    {
      iconBg: 'blackAlpha.500',
    }
  );

  return (
    <Card _hover={hover} rounded="2xl">
      <CardHeader as={HStack}>
        <Circle bg={iconBg} p={2}>
          <Icon as={MdVoiceChat} w="30px" h="30px" color="green.500" />
        </Circle>
        <Text>My Channel</Text>
      </CardHeader>
    </Card>
  );
}
