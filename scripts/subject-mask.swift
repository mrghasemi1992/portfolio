// Writes a greyscale subject mask (white = person) for a photo, using Apple's on-device
// Vision foreground segmentation — the same model behind "Copy Subject" in Photos.
//   swift scripts/subject-mask.swift <photo> <mask.png>
import CoreImage
import Foundation
import Vision

let args = CommandLine.arguments
guard args.count == 3 else {
  print("usage: swift scripts/subject-mask.swift <photo> <mask.png>")
  exit(1)
}
let handler = VNImageRequestHandler(url: URL(fileURLWithPath: args[1]))
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])
guard let result = request.results?.first else {
  print("no subject found")
  exit(1)
}
let buffer = try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
let mask = CIImage(cvPixelBuffer: buffer)
try CIContext().writePNGRepresentation(
  of: mask,
  to: URL(fileURLWithPath: args[2]),
  format: .L8,
  colorSpace: CGColorSpaceCreateDeviceGray()
)
print("wrote \(args[2])")
