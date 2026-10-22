/**
 * Full-screen post-processing after the 3D scene renders:
 * bloom (glow on fire/runes), slight color tweak, vignette, soft depth of field.
 */
import { Bloom, DepthOfField, EffectComposer, HueSaturation, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function SceneEffects() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.65}
        luminanceSmoothing={0.35}
        mipmapBlur
        blendFunction={BlendFunction.ADD}
      />
      <HueSaturation saturation={0.08} hue={0.02} />
      <Vignette eskil offset={0.22} darkness={0.65} blendFunction={BlendFunction.NORMAL} />
      <DepthOfField focusDistance={0.012} focalLength={0.024} bokehScale={2.2} height={480} />
    </EffectComposer>
  )
}
