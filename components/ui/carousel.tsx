import * as React from "react";
import { View, Pressable, StyleSheet, Dimensions } from "react-native";
import ReanimatedCarousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export type CarouselApi = {
  next: () => void;
  prev: () => void;
};

type CarouselProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  height?: number;
  loop?: boolean;
  autoPlay?: boolean;
  setApi?: (api: CarouselApi) => void;
};

export function Carousel<T>({
  data,
  renderItem,
  height = 220,
  loop = false,
  autoPlay = false,
  setApi,
}: CarouselProps<T>) {
  const ref = React.useRef<any>(null); // ✅ FIX: no TS error

  const api = React.useMemo(
    () => ({
      next: () => ref.current?.next(),
      prev: () => ref.current?.prev(),
    }),
    []
  );

  React.useEffect(() => {
    setApi?.(api);
  }, [api, setApi]);

  return (
    <View style={styles.root}>
      <ReanimatedCarousel
        ref={ref}
        width={width}
        height={height}
        data={data}
        loop={loop}
        autoPlay={autoPlay}
        pagingEnabled      // ✅ important
        snapEnabled        // ✅ important
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </View>
  );
}

/* ================= CONTROLS ================= */

type ControlProps = {
  onPress: () => void;
  children: React.ReactNode;
};

export function CarouselNext({ onPress, children }: ControlProps) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      {children}
    </Pressable>
  );
}

export function CarouselPrevious({ onPress, children }: ControlProps) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      {children}
    </Pressable>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: {
    position: "relative",
  },
  btn: {
    marginTop: 14,
    alignSelf: "center",
    backgroundColor: "#4F46E5",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
});
