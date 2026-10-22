/**
 * Full-screen post-processing after the 3D scene renders:
 * bloom (glow on fire/runes), slight color tweak, vignette. No depth-of-field (keeps image sharp).
 */
import { Bloom, EffectComposer, HueSaturation, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function SceneEffects() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.45}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.25}
        mipmapBlur
        blendFunction={BlendFunction.ADD}
      />
      <HueSaturation saturation={0.08} hue={0.02} />
      <Vignette eskil offset={0.22} darkness={0.55} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  )
}
