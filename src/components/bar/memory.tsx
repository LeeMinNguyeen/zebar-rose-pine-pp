import { cn } from "../../lib/utils";
import { Show, createEffect, createSignal } from "solid-js";
import { useProviders } from "../../lib/providers-context";

function Memory() {
  const { memory } = useProviders();
  const [memorySig, setMemorySig] = createSignal(memory());
  createEffect(() => setMemorySig(memory()));

  return (
    <Show when={memorySig()}>
      <div
        class={cn(
          "h-8 flex items-center justify-center gap-2 text-[var(--memory)] bg-[var(--memory)]/10 rounded-full pr-3 pl-4"
        )}
      >
        <i class="nf nf-fa-memory text-lg"></i>
        <span class="text-base">
          {(memorySig()!.usedMemory / 1000000000).toFixed(0)}GB
        </span>
      </div>
    </Show>
  );
}

export default Memory;
