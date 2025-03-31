import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function UpperNav() {
  return (
    <div className="w-full bg-white border-b border-gray-300">
      <div className="container flex justify-between items-center py-2 text-sm text-gray-800">
        {/* Informations de contact */}
        <div className="flex items-center space-x-4 text-accent-foreground">
          <span className="flex items-center space-x-1">
            <Mail size={16} className="text-orange-600" />
            <a href="mailto:contact@zetta-training.tn">
              contact@zetta-training.tn
            </a>
          </span>
          <span className="flex items-center space-x-1">
            <Phone size={16} className="text-orange-600" />
            <a href="tel:+21622008997">+216 22 008 997</a>
          </span>
          <span className="flex items-center space-x-1">
            <MapPin size={16} className="text-orange-600" />
            <span>Route Lafrane km 1, Sfax</span>
          </span>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex space-x-3 text-black">
          <a href="#" className="hover:text-orange-600">
            <Facebook size={18} />
          </a>
          <a href="#" className="hover:text-orange-600">
            <Instagram size={18} />
          </a>
          <a href="#" className="hover:text-orange-600">
            <Linkedin size={18} />
          </a>
          <a href="#" className="hover:text-orange-600">
            <Youtube size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
