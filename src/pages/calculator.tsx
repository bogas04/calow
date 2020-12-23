import {
  ChevronUpIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import {
  Link,
  Box,
  Text,
  Heading,
  IconButton,
  FormControl,
  FormHelperText,
  Collapse,
  Flex,
  Tag,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import BodyMetricsForm from "../components/BodyMetricsForm";
import { Page } from "../components/layouts";
import NutritionBar from "../components/NutritionBar";
import { Store } from "../store";
import {
  computeCaloricNeeds,
  computeMacroFromCalories,
} from "../util/nutrition";

export default function Calculator() {
  const [body, setBody] = useState<Store["body"]>({
    activity: 0,
    age: 0,
    weight: 0,
    height: 0,
    gender: "female",
  });
  const [expand, setExpand] = useState(false);
  const [goalCalories, setGoalCalories] = useState<number>(0);

  const { bmr, caloricNeeds } = useMemo(() => computeCaloricNeeds(body), [
    body,
  ]);

  const goal = computeMacroFromCalories(goalCalories);

  const goalInfo = getGoalInfo(
    goal.calories || caloricNeeds.calories,
    caloricNeeds.calories
  );

  const hasComputedCaloricNeeds =
    caloricNeeds.calories !== 0 || !!body.height || !!body.weight;

  return (
    <Page heading="BMR Calculator">
      <Box mb="6" as="section">
        <Text>
          It could be hard to figure out how many calories or how many grams of
          protein you should be eating daily. This calculator should make it
          easier for you to do these calculations. I explain this further in my{" "}
          <Link
            href="https://bogas04.github.io/blog/how-i-calculate-my-protein-requirements-12-20-2020"
            target="_blank"
            color="teal.500"
          >
            blog post <ExternalLinkIcon mx="2px" />
          </Link>
          in case you're curious. First step is to find your maintenance needs.
          This is based on{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation"
            color="teal.500"
            target="_blank"
          >
            Harris–Benedict's revised BMR equation (1990){" "}
            <ExternalLinkIcon mx="2px" />
          </Link>
          . The macro ratio used here is:
          <UnorderedList>
            <ListItem>50% calories from carbohydrates</ListItem>
            <ListItem>22.5% calories from protein</ListItem>
            <ListItem>27.5% calories from fat</ListItem>
          </UnorderedList>
        </Text>
        <Heading
          my="4"
          size="lg"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Maintenance Needs
          {hasComputedCaloricNeeds && (
            <IconButton
              isRound
              variant="ghost"
              aria-label={expand ? "Collapse" : "Expand"}
              onClick={() => setExpand(!expand)}
              icon={expand ? <ChevronUpIcon /> : <ChevronDownIcon />}
            />
          )}
        </Heading>
        <FormControl>
          <FormHelperText>
            These are your daily caloric needs in order to maintain your body
            weight, based on your body metrics.
          </FormHelperText>
        </FormControl>

        <Collapse in={expand || !hasComputedCaloricNeeds}>
          <BodyMetricsForm metrics={body} onChange={setBody} />
        </Collapse>

        {hasComputedCaloricNeeds && (
          <Flex
            mt="4"
            align="center"
            justify="center"
            transform={["", "scale(1.3)"]}
          >
            <NutritionBar nutrition={caloricNeeds} showLegend />
          </Flex>
        )}
      </Box>

      {hasComputedCaloricNeeds && (
        <Box mb="6" as="section">
          <Heading
            size="lg"
            my="2"
            justifyContent="space-between"
            alignItems="center"
            d="flex"
          >
            Your Goal
            <Tag size="sm" textTransform="uppercase" color={goalInfo.color}>
              {goalInfo.text}
            </Tag>
          </Heading>

          {goalCalories === 0 && (
            <Text>
              Now, you can use the slider to set a goal. As you slide it, you
              can move from calorie deficit to calorie surplus.
            </Text>
          )}

          {goalCalories !== 0 && (
            <FormControl>
              <FormHelperText>{goalInfo.description}</FormHelperText>
            </FormControl>
          )}

          <FormControl>
            <FormLabel
              fontSize="sm"
              textTransform="capitalize"
              d="flex"
              alignItems="center"
              pr="0"
              mt="2"
              justifyContent="space-between"
            >
              Calories {goal.calories || caloricNeeds.calories}kCal
            </FormLabel>
          </FormControl>

          <Box py={2}>
            <Slider
              step={10}
              defaultValue={goal.calories || caloricNeeds.calories}
              value={goalCalories}
              onChange={setGoalCalories}
              min={bmr}
              max={2 * caloricNeeds.calories - bmr}
            >
              <SliderTrack>
                <SliderFilledTrack bg={goalInfo.color} />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <Flex
            mt="4"
            justify="center"
            align="center"
            transform={["", "scale(1.3)"]}
          >
            <NutritionBar nutrition={goal} showLegend />
          </Flex>
        </Box>
      )}
    </Page>
  );
}

Calculator.hideFooter = true;

function getGoalInfo(goal: number, needs: number) {
  let description =
    "You've set a goal within the limits of your maintenance needs. You would continue to have same weight if you maintain your lifestyle.";
  let color = "gray.500";
  let text = "maintenance";
  const range = 50;

  if (goal < needs - range) {
    description =
      "You've set a goal lower than your maintenance needs. You would lose weight if you continue to stay calorie deficit.";
    color = "red.500";
    text = "deficit";
  } else if (goal > needs + range) {
    description =
      "You've set a goal higher than your maintenance needs. You would gain weight if you continue to stay calorie surplus.";
    color = "green.500";
    text = "surplus";
  }

  return { description, color, text };
}
