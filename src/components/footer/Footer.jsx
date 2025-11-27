/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
    Inbox,
    SendHorizontal,
} from "lucide-react";
import {
    IconBrandFacebookFilled,
    IconBrandLinkedinFilled,
    IconBrandTwitterFilled,
    IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Footer() {
    return (
        <footer className="max-width">
            {/* Background image */}
            <motion.img
                src="./footer.png"
                alt="footer"
                className="w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
            />

            {/* Main footer content */}
            <motion.div
                className="px-20 py-10 bg-color-50 h-110 flex flex-row justify-start items-center gap-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Left section */}
                <motion.div
                    className="w-1/3 h-full flex flex-col justify-start items-start gap-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-4 w-full">
                        <div className="flex flex-row justify-start items-center gap-4">
                            <motion.img
                                src="./logo.png"
                                alt="logo"
                                className="w-11"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                viewport={{ once: true }}
                            />
                            <motion.h5
                                className="text-5xl font-bold bg-gradient-to-b from-color-800 to-[#8D82E5] bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                BookYaar
                            </motion.h5>
                        </div>
                        <motion.p
                            className="text-lg text-muted-foreground max-w-sm"
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                            viewport={{ once: true }}
                        >
                            Connecting students with Indian&apos;s best tutors for smarter
                            learning.
                        </motion.p>
                    </div>

                    <motion.div
                        className="space-y-1"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-xl font-semibold">Contact:</div>
                        <p className="text-lg text-muted-foreground max-w-sm">
                            contact@bookyaar.com
                        </p>
                    </motion.div>

                    <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-xl font-semibold">Follow Us:</div>
                        <div className="flex flex-row gap-4 items-center justify-start">
                            {[IconBrandFacebookFilled, IconBrandLinkedinFilled, IconBrandYoutubeFilled, IconBrandTwitterFilled].map(
                                (Icon, idx) => (
                                    <motion.button
                                        key={idx}
                                        className="p-1 border-2 border-color-600 text-color-600 rounded-full bg-color-100"
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                    >
                                        <Icon />
                                    </motion.button>
                                )
                            )}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Vertical separator */}
                <Separator
                    orientation="vertical"
                    className={"bg-[#E6E5E5] !w-[2px] rounded-full"}
                />

                {/* Right section */}
                <motion.div
                    className="w-2/3 h-full flex flex-col justify-start items-start gap-16"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {/* Newsletter */}
                    <motion.div
                        className="w-full flex flex-row items-end gap-16"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-1">
                            <div className="text-3xl font-semibold">Our Newsletter</div>
                            <p className="text-lg text-muted-foreground">
                                Get instant news by subscribing to <br /> our newletter
                            </p>
                        </div>
                        <div className="w-full max-w-md relative">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="h-14 pl-13 bg-white border-0 placeholder:text-stone-400 placeholder:italic placeholder:text-base"
                            />
                            <Inbox className="absolute top-[30%] left-4 text-stone-400 " />
                            <motion.div
                                className="absolute right-1 top-1"
                                initial={{ width: 48 }}                 // icon-only width
                                whileHover={{ width: 104 }}             // expanded width
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                style={{ originX: 1 }}                  // grow from right to left
                            >
                                <Button
                                    variant="outline"
                                    className="group h-12 w-full flex items-center justify-end gap-2 overflow-hidden text-muted-foreground"
                                >
                                    <span className="translate-x-4 opacity-0 text-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                                        Send
                                    </span>

                                    <SendHorizontal className="!w-5 !h-5 shrink-0" />
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Links grid */}
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-full grid grid-cols-4 gap-10">
                            {[
                                {
                                    title: "Company",
                                    links: ["About Us", "Careers", "Blog", "Press"],
                                },
                                {
                                    title: "Support",
                                    links: [
                                        "Help Center",
                                        "Terms of Service",
                                        "Legal",
                                        "Privacy Policy",
                                    ],
                                },
                                {
                                    title: "Services ",
                                    links: [
                                        "Find a Tutor",
                                        "Become a Tutor",
                                        "Demo Lessons",
                                        "Pricing",
                                    ],
                                },
                                {
                                    title: "Resources",
                                    links: ["Community", "Guides", "Events", "Newsletter"],
                                },
                            ].map((section, idx) => (
                                <motion.div
                                    key={section.title}
                                    className="space-y-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.35,
                                        ease: "easeOut",
                                        delay: 0.08 * idx,
                                    }}
                                    viewport={{ once: true }}
                                >
                                    <div className="text-xl font-semibold">{section.title}</div>
                                    <div className="flex flex-col gap-2 text-lg text-muted-foreground">
                                        {section.links.map((item) => (
                                            <span key={item}>{item}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Bottom bar */}
            <div className="px-20 pb-10 w-full bg-color-50 space-y-4">
                <Separator className={"bg-[#E6E5E5] !h-[2px] rounded-full"} />
                <motion.p
                    className="text-center text-muted-foreground"
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    © 2025 All right reserved. Powered by{" "}
                    <span className="font-semibold">BookYaar</span>
                </motion.p>
            </div>
        </footer>
    );
}

export default Footer;
